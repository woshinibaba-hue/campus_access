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

const handleSubmit = () => {
  console.log(formData.value)
}

defineExpose({
  formRef
})
</script>

<style scoped lang="less"></style>
