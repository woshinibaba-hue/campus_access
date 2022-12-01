<template>
  <el-container>
    <el-aside :width="isCollapse ? '60px' : '200px'">
      <Menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- <Menu :isCollapse="isCollapse" /> -->
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
  <!--
  <div class="layout-btn">
    <el-icon><IconBiGear /></el-icon>
  </div> -->
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

.layout-btn {
  position: fixed;
  text-align: center;
  width: 50px;
  height: 50px;
  line-height: 56px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  background-color: var(--el-menu-active-color);
  border-radius: 8px 0 0 8px;
}
</style>
