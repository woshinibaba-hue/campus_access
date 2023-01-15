<template>
  <Form
    v-bind="formConfig"
    v-model="formData"
    ref="formRef"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import Form from '@/components/Form'

import { formConfig } from './config/form.config'
import type { IRegister } from '@/api/login/type'

const formRef = ref<InstanceType<typeof Form>>()
const formData = ref<IRegister>({})

const handleSubmit = async () => {
  await register(formData.value)
  ElNotification({
    message: '注册成功',
    type: 'success'
  })
  formRef.value?.clear()
}

defineExpose({
  formRef
})
</script>

<style scoped lang="less"></style>
