<template>
  <Card title="您的请假记录" :loading="isLoading">
    <Table
      v-bind="tableConfigComputed"
      @add="dialogVisible = true"
      :data="data?.data"
      @refresh="refresh"
      @currentChange="handleCurrent"
    />
    <Dialog v-bind="dialogConfig" v-model="dialogVisible" @confirm="confirm" />
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

const handleCurrent = (page: number) => {
  pages.page = page
}

const confirm = async (formData: any) => {
  await createAsking(formData)
  ElNotification({
    message: '成功',
    type: 'success'
  })
  refresh()
  dialogVisible.value = false
}
</script>

<style lang="less" scoped></style>
