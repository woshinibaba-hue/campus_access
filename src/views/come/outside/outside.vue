<template>
  <div class="outside">
    <Card title="校外入校申请">
      <Table v-bind="tableConfig" />
      <Dialog v-bind="dialogConfig" />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { dialogConfig } from './config/dialog.config'
import { tableConfig } from './config/table.config'
</script>

<style lang="less" scoped></style>
