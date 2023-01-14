<template>
  <div class="users">
    <Card title="用户管理">
      <Table :data="data?.data" v-bind="tableConfigComputed" />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'

const { data } = useLoading(getUserAll)

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total
  }
}))
</script>

<style scoped lang="less"></style>
