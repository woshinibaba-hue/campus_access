<template>
  <el-form
    :label-width="labelWidth"
    :rules="rules"
    ref="formRef"
    :model="modelValue"
  >
    <el-form-item
      v-for="item in columns"
      :key="item.field"
      :label="item.lable"
      :prop="item.field"
    >
      <el-input
        :type="item.type"
        :placeholder="item.placeholder"
        :show-password="item.type === 'password'"
        :disabled="item.isDisabled"
        :rows="item.rows"
        v-model="modelValue[item.field]"
      />
    </el-form-item>
    <el-form-item v-if="isAction" class="action">
      <el-button type="primary" @click="handleSubmit">
        {{ submitText }}
      </el-button>
      <el-button @click="clear">{{ clearText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { FormRules } from 'element-plus'

type TFormProps = {
  columns: TFromItem[]
  rules?: FormRules
  labelWidth?: string
  submitText?: string
  clearText?: string
  isAction?: boolean
  actionplace?: 'center' | 'start' | 'end'
  modelValue: any
}

const props = withDefaults(defineProps<TFormProps>(), {
  labelWidth: '120px',
  submitText: '提交',
  clearText: '清空',
  isAction: true,
  actionplace: 'center',
  modelValue: {}
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'update:modelValue', data: Record<string, any>): void
}>()

const formRef = ref<InstanceType<typeof ElForm>>()

const handleSubmit = () => {
  formRef.value?.validate(isValid => {
    if (isValid) emits('submit')
  })
}

const clear = () => {
  emits('update:modelValue', {})
  setTimeout(() => formRef.value?.clearValidate())
}

defineExpose({
  clear
})
</script>

<style lang="less" scoped>
.action {
  :deep(.el-form-item__content) {
    display: flex;
    justify-content: v-bind(actionplace);
  }
}
</style>
