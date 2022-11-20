<template>
  <el-container>
    <el-aside :width="isCollapse ? '60px' : '200px'">
      <Menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Header :isCollapse="isCollapse" @handleFold="handlerCollapse" />
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

const isCollapse = ref(false)
const handlerCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped lang="less">
.el-main {
  min-height: calc(100vh - 120px);
  background-color: #f5f5f5;
}

.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
}
</style>
