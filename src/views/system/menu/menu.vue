<template>
  <Card title="菜单管理" :loading="isLoading">
    <Table
      v-bind="tableCondig"
      :data="data?.data"
      :pagination="{ total: data?.total }"
      @add="visible = true"
      @currentChange="handleCurrentChange"
    />

    <Dialog v-bind="dialogConfig" v-model="visible" @confirm="confirm" />
  </Card>
</template>

<script setup lang="ts">
import { tableCondig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'
import { Menu } from '@/api/menu'

const visible = ref(false)
const { data, isLoading, pages } = useLoading(getMenuList)

const confirm = (formData: Menu) => {
  console.log(formData)
}

const handleCurrentChange = (page: number) => {
  console.log(page)
}
</script>

<style scoped lang="less"></style>
