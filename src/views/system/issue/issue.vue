<template>
  <div class="issue">
    <Card title="通知管理" :isLoading="isLoading">
      <Table
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
import type { TInform } from '@/api/inform/inform'
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const { data, isLoading, pages, refresh } = useLoading(getInformAll)

const dialogVisible = ref(false)

const { confirm, handleDelete, editItem, handleEdit } = useTableUtil({
  refresh,
  editFn: updateIssue,
  addFn: issueInform,
  dialogVisible,
  deleteFn: deleteById
})

const tableConfigComputed = computed<TableConfig<TInform>>(() => ({
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

// const confirm = async (formData: TInform) => {
//   if (!formData.id) await issueInform(formData)
//   else await updateIssue(formData)
//   ElNotification({
//     message: '成功',
//     type: 'success'
//   })
//   refresh()
//   dialogVisible.value = false
// }

// const handleDelete = async (data: TInform) => {
//   await deleteById(data.id)
//   ElNotification({
//     message: '删除成功',
//     type: 'success'
//   })
//   refresh()
// }

// const editItem = ref<OmitBase<TInform>>({})
// const handleEdit = (data: TInform) => {
//   editItem.value = data
//   dialogVisible.value = true
// }
</script>

<style scoped lang="less"></style>
