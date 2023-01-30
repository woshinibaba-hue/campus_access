<template>
  <Card title="系统角色" :loading="isLoading">
    <Table v-bind="tableConfig" :data="data?.data" />
  </Card>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'
const { data, isLoading } = useLoading(getRole)
</script>

<style lang="less" scoped></style>
