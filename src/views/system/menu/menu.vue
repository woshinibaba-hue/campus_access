<template>
  <Card title="菜单管理">
    <Table
      v-bind="tableCondig"
      :data="data?.data"
      :pagination="{ total: data?.total }"
    />
  </Card>
</template>

<script setup lang="ts">
import { tableCondig } from './config/table.config'

const { data, isLoading, pages } = useLoading(getMenuList)
</script>

<style scoped lang="less"></style>
