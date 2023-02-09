<template>
  <Card title="请假审核" :loading="isLoading">
    <Table
      v-bind="tableConfigComputed"
      :data="data?.data"
      @consent="consent"
      @refuse="refuse"
      @refresh="refresh"
      @current-change="(page: number) => (pages.page = page)"
    />

    <Dialog v-bind="dialogConfig" v-model="dialogVisible" @confirm="confirm" />
  </Card>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const { data, isLoading, refresh, pages } = useLoading(getAskingList)

const dialogVisible = ref(false)
const currentRow = ref<any>({})

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
  dialogVisible.value = true
  currentRow.value = row
}

const confirm = async (formData: any) => {
  dialogVisible.value = false
  await auditAsking(currentRow.value.id, {
    isAudit: 2,
    email: currentRow.value.user.email,
    cause: formData.cause
  })
  ElNotification({
    message: '成功',
    type: 'warning'
  })
  refresh()
}
</script>

<style lang="less" scoped></style>
