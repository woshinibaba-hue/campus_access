<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.el-header {
  background-color: skyblue;
}

.el-main {
  height: calc(100vh - 120px);
  background-color: #f5f5f5;
}

.el-footer {
  background-color: skyblue;
}
</style>
