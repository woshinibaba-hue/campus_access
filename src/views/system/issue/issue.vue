<template>
  <div class="issue">
    <Card title="通知管理" :isLoading="isLoading">
      <Tabel
        v-bind="tableConfigComputed"
        :data="data?.data"
        @current-change="handleCurrentChange"
        @refresh="refresh"
        @add="dialogVisible = true"
        @delete="handleDelete"
        @edit="handleEdit"
      />

      <Dialog
        v-bind="dialogConfig"
        v-model="dialogVisible"
        v-model:edit="editItem"
        @confirm="confirm"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks'
import Tabel from '@/components/Table'
import Dialog from '@/components/Dialog'
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'
import * as inform from '@/api/inform'

const { data, isLoading, pages, refresh } = useLoading(inform.getInformAll)

const dialogVisible = ref(false)

const tableConfigComputed = computed<TableConfig<inform.TInform>>(() => ({
  ...tableConfig,
  isLoading: isLoading.value,
  pagination: {
    total: data.value?.total,
    ...pages
  }
}))

const handleCurrentChange = (page: number) => {
  pages.page = page
}

const confirm = (formData: OmitBase<inform.TInform>) => {
  inform.issueInform(formData).then(() => {
    ElNotification({
      message: '发布成功',
      type: 'success'
    })
    refresh()
    dialogVisible.value = false
  })
}

const handleDelete = async (data: inform.TInform) => {
  await inform.deleteById(data.id)
  ElNotification({
    message: '删除成功',
    type: 'success'
  })
  refresh()
}

const editItem = ref<OmitBase<inform.TInform>>({})
const handleEdit = (data: inform.TInform) => {
  editItem.value = data
  dialogVisible.value = true
}
</script>

<style scoped lang="less">
.issue {
  // display: flex;
  // justify-content: center;
  // width: 1220px;
}
</style>
