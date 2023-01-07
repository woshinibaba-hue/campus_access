<template>
  <div class="issue">
    <Card title="校园通知发布">
      <Form
        ref="formRef"
        v-bind="formConfig"
        v-model="formData"
        @submit="handleSubmit"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import Form from '@/components/Form'
import { formConfig } from './config/form.config'
import { TInform, issueInform } from '@/api/inform'

const formData = ref<OmitBase<TInform>>({})
const formRef = ref<InstanceType<typeof Form>>()

const handleSubmit = () => {
  issueInform(formData.value).then(() => {
    ElNotification({
      message: '发布成功',
      type: 'success'
    })
    formRef.value?.clear()
  })
}
</script>

<style scoped lang="less"></style>
