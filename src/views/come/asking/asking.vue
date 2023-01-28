<template>
  <Card title="您的请假记录" :loading="isLoading">
    <Table
      v-bind="tableConfigComputed"
      @add="dialogVisible = true"
      :data="data?.data"
    />
    <Dialog v-bind="dialogConfig" v-model="dialogVisible" />
  </Card>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const dialogVisible = ref(false)

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total
  }
}))

const { data, isLoading, pages, refresh } = useLoading(getAskingAll)
</script>

<style lang="less" scoped></style>
