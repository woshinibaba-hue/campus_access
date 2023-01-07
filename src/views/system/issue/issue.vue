<template>
  <div class="issue">
    <Card title="通知管理" :isLoading="isLoading">
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
        @refresh="refresh"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks'
import Tabel from '@/components/Table'
import Form from '@/components/Form'
import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { TInform, issueInform, getInformAll } from '@/api/inform'

const { data, isLoading, pages, refresh } = useLoading(getInformAll)

const formData = ref<OmitBase<TInform>>({})
const formRef = ref<InstanceType<typeof Form>>()

const tableConfigComputed = computed<TableConfig<TInform>>(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total,
    ...pages
  }
}))

const handleSubmit = () => {
  issueInform(formData.value).then(() => {
    ElNotification({
      message: '发布成功',
      type: 'success'
    })
    formRef.value?.clear()
    refresh()
  })
}

const handleCurrentChange = (page: number) => {
  pages.page = page
  refresh()
}
</script>

<style scoped lang="less"></style>
