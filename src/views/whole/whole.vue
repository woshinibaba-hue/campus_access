<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card v-load="loading">
        <p class="title">全国疫情数据(含港澳台)</p>
        <el-row>
          <el-col :span="8">
            <CardData
              color="--el-color-warning"
              name="境外输入"
              :num="data?.chinaTotal.total.input ?? 0"
              :today-num="data?.chinaTotal.today.input ?? 0"
            />
          </el-col>
          <el-col :span="8">
            <CardData
              name="无症状感染者"
              color="#791618"
              :num="data?.chinaTotal.extData.noSymptom ?? 0"
              :today-num="data?.chinaTotal.extData.incrNoSymptom ?? 0"
            />
          </el-col>
          <el-col :span="8">
            <CardData
              name="现有确证"
              color="#e44a3d"
              :num="
                data?.chinaTotal.total.confirm -
                  data?.chinaTotal.total.dead -
                  data?.chinaTotal.total.heal ?? 0
              "
              :today-num="data?.chinaTotal.today.storeConfirm ?? 0"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <CardData
              name="累计确证"
              color="#a31d13"
              :num="data?.chinaTotal.total.confirm ?? 0"
              :today-num="data?.chinaTotal.today.confirm ?? 0"
            />
          </el-col>
          <el-col :span="8">
            <CardData
              name="累计死亡"
              color="#333"
              :num="data?.chinaTotal.total.dead ?? 0"
              :today-num="data?.chinaTotal.today.dead ?? 0"
            />
          </el-col>
          <el-col :span="8">
            <CardData
              name="累计治愈"
              color="#34aa70"
              :num="data?.chinaTotal.total.heal ?? 0"
              :today-num="data?.chinaTotal.today.heal ?? 0"
            />
          </el-col>
        </el-row>
        <p class="updateDate">截至 {{ data?.lastUpdateTime ?? '出错啦~' }}</p>
      </el-card>
      <el-card style="margin-top: 10px">
        <p class="title">各个省份以及城市的疫情信息</p>
        <el-table-v2
          v-load="loading"
          :columns="columns"
          :data="data?.chinaConfirm ?? []"
          :width="585"
          :height="480"
          fixed
          expand-column-key="children"
        />
        <!-- <el-table
          :data="data?.chinaConfirm ?? []"
          style="width: 100%; height: 500px"
          row-key="id"
          :tree-props="{ children: 'children' }"
          lazy
        >
          <el-table-column label="更多" width="60" />
          <el-table-column prop="name" label="地区" :width="120" />
          <el-table-column prop="value" label="现有确诊" />
          <el-table-column prop="confirm" label="新增确诊" />
          <el-table-column prop="dead" label="累计死亡" />
          <el-table-column prop="heal" label="累计治愈" />
        </el-table> -->
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card v-load="loading">
        <p class="title">全国疫情图</p>
        <Map :data="data?.chinaConfirm ?? []" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import CardData from './components/CardData.vue'
import { Map } from '@/components/Echart'
import { getOutbreak } from '@/api/outbreak'

const data = ref<any>()

const loading = ref(true)

const columns = [
  {
    key: 'children',
    dataKey: '',
    title: '更多',
    width: 45
  },
  {
    key: 'name',
    dataKey: 'name',
    title: '地区',
    width: 100
  },
  {
    key: 'value',
    dataKey: 'value',
    title: '现有确诊',
    width: 110
  },
  {
    key: 'confirm',
    dataKey: 'confirm',
    title: '新增确诊',
    width: 110
  },
  {
    key: 'dead',
    dataKey: 'dead',
    title: '累计死亡',
    width: 100
  },
  {
    key: 'heal',
    dataKey: 'heal',
    title: '累计治愈',
    width: 100
  }
]

getOutbreak().then((res) => {
  data.value = res?.data
  loading.value = false
})
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  padding-left: 12px;
  border-left: 4px solid var(--el-color-primary);
  margin-bottom: 20px;
}

.updateDate {
  color: #a9a9a9;
  font-size: 16px;
}
</style>
