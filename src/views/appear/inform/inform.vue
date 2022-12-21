<template>
  <div class="inform">
    <el-row :gutter="15">
      <el-col :span="16">
        <Card title="今日通知"> </Card>
      </el-col>
      <el-col :span="8">
        <Card title="历来通知">
          <Table
            :data="data"
            v-bind="tableCondfig"
            @selectData="selectData"
            @currentChange="currentChange"
          />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { tableCondfig } from './config/table.config'
const data = [
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  },
  {
    title: '标题1',
    createAt: '2022-12-21'
  }
]

const currentChange = (page: number) => {
  console.log(page)
}

const selectData = (d: any) => {
  console.log(d)
}
</script>

<style lang="less" scoped></style>
