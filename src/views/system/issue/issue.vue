<template>
  <div class="issue">
    <Card title="通知管理">
      <!-- <Form
        ref="formRef"
        v-bind="formConfig"
        v-model="formData"
        @submit="handleSubmit"
      /> -->
      <Tabel
        v-bind="tableConfigComputed"
        :data="data?.data"
        @current-change="handleCurrentChange"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import Tabel from '@/components/Table'
import Form from '@/components/Form'
import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { TInform, issueInform, getInformAll } from '@/api/inform'

const data = ref<IPaging<TInform[]>>()
const formData = ref<OmitBase<TInform>>({})
const formRef = ref<InstanceType<typeof Form>>()
const pages = ref<IPage>({ page: 1, limit: 10 })

const tableConfigComputed = computed<TableConfig<TInform>>(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total,
    ...pages.value
  }
}))

const getData = () => {
  getInformAll(pages.value).then(res => (data.value = res.data))
}

getData()

const handleSubmit = () => {
  issueInform(formData.value).then(() => {
    ElNotification({
      message: '发布成功',
      type: 'success'
    })
    formRef.value?.clear()
  })
}

const handleCurrentChange = (page: number) => {
  pages.value.page = page
  getData()
}
</script>

<style scoped lang="less"></style>
