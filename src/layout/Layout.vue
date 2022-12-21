<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '260px'">
        <Menu :isCollapse="isCollapse" @handleFold="handlerCollapse" />
      </el-aside>
      <el-container class="container-wrap">
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <el-scrollbar class="scrollbar">
            <div class="box">
              <router-view v-slot="{ Component }">
                <transition name="view" mode="out-in" appear>
                  <component :is="Component" :key="$route.fullPath" />
                </transition>
              </router-view>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Header from './components/header.vue'
import Menu from './components/menu.vue'
import Footer from './components/footer.vue'

const isCollapse = ref(false)

const handlerCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style>
body {
  overflow: hidden;
}
</style>

<style scoped lang="less">
.container-wrap {
  height: 100%;
}
.el-main {
  padding: 0;
  height: 100%;
  overflow-x: hidden;

  .box {
    margin: 0 16px 60px 16px;
  }
}

.scrollbar {
  height: calc(100vh - 76px);
  overflow: hidden;
  margin-top: 15px;
}

.el-aside {
  transition: width 0.25s;
  overflow-x: hidden;
  margin: 16px 0 16px 16px;
  height: calc(100vh - 32px);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
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
