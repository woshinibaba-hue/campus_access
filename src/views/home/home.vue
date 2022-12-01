<template>
  <div class="home">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="个人信息" name="profile">个人信息</el-tab-pane>
      <el-tab-pane label="个人信息录入" name="info">
        <Info />
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="pwd">密码修改</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import Info from './components/info.vue'
const activeName = ref('info')
</script>

<style lang="less" scoped></style>
