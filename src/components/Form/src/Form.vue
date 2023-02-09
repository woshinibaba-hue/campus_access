<!-- <template>
  <el-form
    :label-width="labelWidth"
    :rules="rules"
    ref="formRef"
    :model="modelValue"
    :label-position="labelPosition"
  >
    <el-form-item
      v-for="item in columns"
      :key="item.field"
      :label="item.lable"
      :prop="item.field"
    >
      <template v-if="item.type === 'upload'">
        <Upload />
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select
          v-model="modelValue[item.field]"
          :placeholder="item.placeholder"
          clearable
        >
          <el-option
            v-for="i in item.options"
            :key="i.value"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </template>
      <template v-else-if="item.type === 'datetime'">
        <el-date-picker
          v-model="modelValue[item.field]"
          type="datetime"
          :placeholder="item.placeholder"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </template>
      <el-input
        v-else
        :type="item.type"
        :placeholder="item.placeholder"
        :show-password="item.type === 'password'"
        :disabled="item.isDisabled"
        :rows="item.rows"
        v-model="modelValue[item.field]"
        clearable
      />
    </el-form-item>
    <el-form-item v-if="isAction" class="action">
      <el-button type="primary" @click="handleSubmit">
        {{ submitText }}
      </el-button>
      <el-button @click="clear">{{ clearText }}</el-button>
    </el-form-item>
  </el-form>
</template> -->
<!-- <script setup lang="ts">
import { ElForm } from 'element-plus'

type TFormProps = {
  columns: TFromItem[]
  rules?: FormRules
  labelWidth?: string | number
  submitText?: string
  clearText?: string
  isAction?: boolean
  actionplace?: 'center' | 'start' | 'end'
  labelPosition?: 'right' | 'left' | 'top'
  modelValue: any
}

withDefaults(defineProps<TFormProps>(), {
  labelWidth: '120px',
  submitText: '提交',
  clearText: '清空',
  isAction: true,
  actionplace: 'center',
  labelPosition: 'left'
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'update:modelValue', data: Record<string, any>): void
}>()

const formRef = ref<InstanceType<typeof ElForm>>()

const handleSubmit = () => {
  formRef.value?.validate(isValid => {
    if (isValid) {
      emits('submit')
    }
  })
}

const clear = () => formRef.value?.resetFields()

defineExpose({
  clear,
  handleSubmit,
  formRef
})
</script> -->

<script lang="ts">
import Upload from '@/components/Upload/Upload.vue'

type TFormProps = {
  columns: TFromItem[]
  rules?: FormRules
  labelWidth?: string | number
  submitText?: string
  clearText?: string
  isAction?: boolean
  actionplace?: 'center' | 'start' | 'end'
  labelPosition?: 'right' | 'left' | 'top'
  modelValue: any
  isInLine?: boolean
}

export default {
  props: [
    'columns',
    'rules',
    'labelWidth',
    'submitText',
    'clearText',
    'isAction',
    'actionplace',
    'labelPosition',
    'modelValue',
    'isInLine'
  ],
  emits: ['submit', 'update:modelValue'],
  components: {
    ElFormItem,
    ElForm,
    ElInput,
    ElDatePicker,
    Upload,
    ElSelect,
    ElOption,
    ElButton
  },
  setup(props: TFormProps, { emit, expose }) {
    const formRef = ref<InstanceType<typeof ElForm>>()

    const handleSubmit = () => {
      formRef.value?.validate(isValid => {
        if (isValid) {
          emit('submit')
        }
      })
    }

    const clear = () => formRef.value?.resetFields()

    expose({
      clear,
      handleSubmit,
      formRef
    })

    return () =>
      h(
        resolveComponent('el-form'),
        {
          rules: props.rules,
          'label-width': props.labelWidth ?? '120px',
          'label-position': props.labelPosition ?? 'left',
          model: props.modelValue,
          ref: formRef,
          class: 'form',
          inline: props.isInLine ?? false
        },
        () => [
          ...props.columns.map(v =>
            h(
              resolveComponent('el-form-item'),
              {
                key: v.field,
                label: v.lable,
                prop: v.field
              },
              () =>
                h(
                  resolveComponent(v.type ?? 'el-input'),
                  {
                    type: v.itemType,
                    rows: v.rows,
                    placeholder: v.placeholder,
                    format: 'YYYY-MM-DD',
                    'range-separator': '至',
                    modelValue: props.modelValue[v.field],
                    onInput($event: any) {
                      let value = ''
                      if (typeof $event !== 'object') {
                        value = $event
                      } else {
                        value = $event.target.value
                      }
                      emit('update:modelValue', {
                        ...props.modelValue,
                        [v.field]: value
                      })
                    },
                    onChange($event: any) {
                      let value = ''
                      if (typeof $event !== 'object') {
                        value = $event
                      } else {
                        value = $event.target.value
                      }

                      emit('update:modelValue', {
                        ...props.modelValue,
                        [v.field]: value
                      })
                    }
                  },
                  () =>
                    v.options?.map(option =>
                      h(resolveComponent('el-option'), {
                        key: option.label,
                        label: option.label,
                        value: option.value
                      })
                    )
                )
            )
          ),
          (props.isAction ?? true) &&
            h(resolveComponent('el-form-item'), { class: 'action' }, () => [
              h(
                resolveComponent('el-button'),
                { type: 'primary', onClick: handleSubmit },
                () => props.submitText ?? '提交'
              ),
              h(
                resolveComponent('el-button'),
                { onClick: clear },
                () => props.clearText ?? '清空'
              )
            ])
        ]
      )
  }
}
</script>

<style lang="less" scoped>
.action {
  :deep(.el-form-item__content) {
    display: flex;
    justify-content: v-bind('actionplace ?? ' center '');
    margin-left: 0 !important;
  }
}

input[type='datetime-local'] {
  width: 100%;
  padding: 1px 11px;
  background-color: var(--el-input-bg-color);
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  line-height: 32px;
  font-size: var(--el-font-size-base);
  border: 0;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  color: var(--el-input-text-color, var(--el-text-color-regular));
}
</style>
