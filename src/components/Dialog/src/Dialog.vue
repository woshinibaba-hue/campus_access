<template>
  <div class="dialog">
    <el-dialog
      v-model="visible"
      :title="`${edit?.id ? '编辑' : '新增'}${title}`"
      :width="width"
      @close="close"
      @open="open"
    >
      <slot name="content">
        <template v-if="form">
          <Form v-bind="form" v-model="formData" ref="formRef" />
          <slot />
        </template>
      </slot>
      <template v-if="isFooter" #footer>
        <span class="dialog-footer">
          <el-button @click="close">
            {{ closeText }}
          </el-button>
          <el-button type="primary" @click="confirm">
            {{ submitText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Form from '@/components/Form'

type Props = {
  closeText?: string
  submitText?: string
  modelValue: boolean
  title?: string
  width?: string
  isFooter?: boolean
  form?: FormConfig<Record<string, any>>
  edit?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  closeText: '关闭',
  submitText: '确认',
  width: '50%',
  isFooter: true,
  title: ''
})

const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
  (e: 'update:edit', formData: any): void
  (e: 'confirm', formData: any): void
  (e: 'close'): void
  (e: 'open'): void
}>()

const formRef = ref<InstanceType<typeof Form>>()

const visible = ref<boolean>()
const formData = ref<any>()

const close = () => {
  emits('update:modelValue', false)
  emits('update:edit', {})
  emits('close')
  formRef.value?.clear()
}

const open = () => emits('open')

const confirm = () => {
  formRef.value?.formRef?.validate(isVal => {
    if (isVal) emits('confirm', formData.value)
  })
}

watchEffect(() => {
  visible.value = props.modelValue
  formData.value = { ...props.edit }
})
</script>

<style scoped></style>
