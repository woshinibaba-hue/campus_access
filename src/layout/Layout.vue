<template>
  <el-container>
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Menu from './components/menu.vue'
import Footer from './components/footer.vue'
</script>

<style scoped lang="less">
.el-main {
  min-height: calc(100vh - 120px);
  background-color: #f5f5f5;
}
</style>
