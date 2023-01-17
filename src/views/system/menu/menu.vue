<template>
  <Card title="菜单管理" :loading="isLoading">
    <Table
      v-bind="tableCondig"
      :data="data?.data"
      :pagination="{ total: data?.total }"
      @add="visible = true"
      @currentChange="handleCurrentChange"
      @delete="deleteById"
    />

    <Dialog v-bind="dialogConfig" v-model="visible" @confirm="confirm" />
  </Card>
</template>

<script setup lang="ts">
import { tableCondig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'
import { deleteMenu, Menu } from '@/api/menu'

const visible = ref(false)
const { data, isLoading, pages, refresh } = useLoading(getMenuList)

const confirm = async (formData: Menu) => {
  await createMenu(formData)
  ElNotification({
    message: '成功',
    type: 'success'
  })
  refresh()
  visible.value = false
}

const deleteById = async (row: Menu) => {
  await deleteMenu(row.id)
  ElNotification({
    message: '删除成功',
    type: 'success'
  })
  refresh()
}

const handleCurrentChange = (page: number) => (pages.page = page)
</script>

<style scoped lang="less"></style>
