<template>
  <el-row :gutter="20" justify="space-between" align="middle">
    <el-col :span="12"> <Tab /></el-col>
    <el-col :span="12">
      <div class="nav-menus">
        <el-icon class="full menu" @click="toggle">
          <IconEpFullScreen v-if="!isFullscreen" />
          <IconBiFullscreenExit v-else />
        </el-icon>
        <div class="switch" @click="toggleDark()">
          <div class="switch-active">
            <el-icon v-if="!isDark"><IconEpSunny /></el-icon>
            <el-icon v-else><IconEpMoon /></el-icon>
          </div>
        </div>
        <el-dropdown class="menu">
          <div class="avatar">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span>欢迎回来 {{ user?.nickName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/whole')">
                全国疫情信息
              </el-dropdown-item>
              <el-dropdown-item @click="userData.logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Tab from './tab.vue'
import { useFullscreen, useDark, useToggle } from '@vueuse/core'
import { useUser } from '@/store'

const userData = useUser()
const { user } = storeToRefs(userData)

const { isFullscreen, toggle } = useFullscreen()
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped lang="less">
.el-row {
  height: 50px;
  margin: 16px;
  user-select: none;

  .el-col {
    display: flex;
    align-items: center;
    height: 100%;

    &:last-child {
      justify-content: flex-end;
    }
  }

  .el-dropdown-link {
    cursor: pointer;

    .name {
      font-size: 20px;
    }
  }

  .nav-menus {
    display: flex;
    align-items: center;
    height: 100%;
    background-color: var(--el-bg-color-overlay);
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-light);

    .menu {
      height: 100%;

      &:hover {
        background-color: var(--el-color-primary-light-9);
      }
    }

    .full {
      width: 40px;
      font-size: 20px;
      cursor: pointer;
    }

    .avatar {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;

      .el-avatar {
        margin-right: 10px;
      }
    }
  }
  .switch {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45px;
    height: 22px;
    border-radius: 10px;
    margin: 0 10px;
    transition: background-color 0.5s, border 0.3s;
    border: 1px solid var(--el-border-color);
    background-color: var(--bg-color-main);

    .switch-active {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 100%;
      content: '';
      border-radius: 50%;
      transition: transform 0.3s, background-color 0.5s;
      transform: translateX(v-bind("!isDark ? '0px' : '20px'"));
      background-color: var(--bg-switch-color);
    }
  }
}
</style>
