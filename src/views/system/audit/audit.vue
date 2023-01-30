<template>
  <Card title="请假审核" :loading="isLoading">
    <Table
      v-bind="tableConfigComputed"
      :data="data?.data"
      @consent="consent"
      @refuse="refuse"
      @refresh="refresh"
    />
  </Card>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'

const { data, isLoading, refresh } = useLoading(getAskingList)

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  isLoading: isLoading.value,
  pagination: {
    total: data.value?.total
  }
}))

const consent = async (row: any) => {
  await auditAsking(row.id, { isAudit: 1, email: row.user.email })
  ElNotification({
    message: '成功',
    type: 'success'
  })
  refresh()
}
const refuse = (row: any) => {
  console.log(row)
}
</script>

<style lang="less" scoped></style>
