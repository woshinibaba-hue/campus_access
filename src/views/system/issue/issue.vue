<template>
  <div class="issue">
    <Card title="通知管理" :isLoading="isLoading">
      <Tabel
        v-bind="tableConfigComputed"
        :data="data?.data"
        @current-change="handleCurrentChange"
        @refresh="refresh"
        @add="handleAdd"
      />

      <Dialog
        v-bind="dialogConfig"
        v-model="dialogVisible"
        @confirm="confirm"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks'
import Tabel from '@/components/Table'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'
import { TInform, issueInform, getInformAll } from '@/api/inform'

const { data, isLoading, pages, refresh } = useLoading(getInformAll)

const formData = ref<OmitBase<TInform>>({})
const formRef = ref<InstanceType<typeof Form>>()
const dialogVisible = ref(false)

const tableConfigComputed = computed<TableConfig<TInform>>(() => ({
  ...tableConfig,
  isLoading: isLoading.value,
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

const handleAdd = () => {
  dialogVisible.value = true
}

const confirm = () => {
  dialogVisible.value = false
}
</script>

<style scoped lang="less"></style>
