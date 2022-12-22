<template>
  <div class="inform">
    <el-row :gutter="15">
      <el-col :span="16">
        <Card :title="`今日通知 → ${inform?.title ?? '暂无通知'}`">
          <div
            class="content"
            v-if="inform?.content"
            v-html="inform?.content"
          />
          <div class="footer" v-if="inform?.id">
            <p class="name">武汉工程科技学院防疫部</p>
            <p class="time">
              {{ format.formatTime(inform.createAt, 'YYYY年MM月DD日') }}
            </p>
          </div>
        </Card>
      </el-col>
      <el-col :span="8">
        <Card title="历来通知">
          <Table :data="data" v-bind="tableCondfig" @selectData="selectData" />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import format from '@/utils/format'
import { getToDay, getInformAll } from '@/api/inform'
import type { TInform } from '@/api/inform'

import { tableCondfig } from './config/table.config'
const data = ref<TInform[]>([])

const inform = ref<TInform>()
getToDay().then((res) => {
  inform.value = res.data[0]
})

getInformAll().then((res) => {
  data.value = res.data.data
})

const selectData = (d: TInform) => {
  inform.value = d
}
</script>

<style lang="less" scoped>
.inform {
  .content {
    :deep(p) {
      margin-bottom: 8px;
    }

    :deep(ul) {
      padding-left: 2em;

      li {
        margin-bottom: 8px;
      }
    }
  }

  .footer {
    margin-top: 10px;
    text-align: right;
    font-size: 14px;
    font-weight: 600;

    .name {
      margin-bottom: 5px;
    }
  }
}
</style>
