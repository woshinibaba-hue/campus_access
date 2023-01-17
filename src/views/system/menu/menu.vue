<template>
  <Card title="菜单管理" :loading="isLoading">
    <Table
      v-bind="tableCondig"
      :data="data?.data"
      :pagination="{ total: data?.total }"
      @add="dialogVisible = true"
      @currentChange="handleCurrentChange"
      @delete="handleDelete"
    />

    <Dialog v-bind="dialogConfig" v-model="dialogVisible" @confirm="confirm" />
  </Card>
</template>

<script setup lang="ts">
import { tableCondig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const dialogVisible = ref(false)
const { data, isLoading, pages, refresh } = useLoading(getMenuList)

const { confirm, handleDelete } = useTable({
  dialogVisible,
  refresh,
  addFn: createMenu,
  deleteFn: deleteMenu
})

const handleCurrentChange = (page: number) => (pages.page = page)
</script>

<style scoped lang="less"></style>
