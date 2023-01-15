<template>
  <div class="nucleates">
    <el-row :gutter="20">
      <el-col :span="8">
        <Card title="请上传当日核酸截图">
          <Upload url="/api/nucleate" />
        </Card>
      </el-col>
      <el-col :span="16">
        <Card title="您的核酸记录" :loading="isLoading">
          <Table v-bind="tableCondfig" :data="data?.data" />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { tableCondfig } from './config/table.config'

const { data, isLoading, pages } = useLoading(getUserNucleate)
</script>

<style scoped lang="less"></style>
