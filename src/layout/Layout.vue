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
        <router-view v-slot="{ Component }">
          <transition name="view" mode="out-in" appear>
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
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
  overflow: hidden;
  background-color: #f5f5f5;
}

.el-aside {
  transition: width 0.25s;
  overflow-x: hidden;
}

.view-enter-active {
  animation: enter 0.3s ease-in-out;
}

.view-leave-active {
  animation: leave 0.3s ease-in-out;
}

@keyframes enter {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }

  100% {
    opacity: 1;
  }
}

@keyframes leave {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}
</style>
