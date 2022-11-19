<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card>
        <p class="title">全国疫情数据(含港澳台)</p>
        <el-row>
          <el-col :span="8"><CardData color="#ffa352" /></el-col>
          <el-col :span="8"><CardData color="#791618" /></el-col>
          <el-col :span="8"><CardData color="#e44a3d" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><CardData color="#a31d13" /></el-col>
          <el-col :span="8"><CardData color="#333" /></el-col>
          <el-col :span="8"><CardData color="#34aa70" /></el-col>
        </el-row>
        <p class="updateDate">截至2022-11-19 09:20</p>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <Map />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import CardData from './components/CardData.vue'
import { Map } from '@/components/Echart'
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  height: 55px;
  text-align: center;
}

.updateDate {
  color: #a9a9a9;
  font-size: 16px;
}
</style>
