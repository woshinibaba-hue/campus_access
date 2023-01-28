<template>
  <div class="menu">
    <header>
      <div class="logo" v-if="!isCollapse">
        <img src="../../assets/images/logo.svg" alt="" />
        <span>校园疫情出入系统</span>
      </div>
      <el-icon @click="handleFold">
        <IconEpFold v-if="!isCollapse" />
        <IconEpExpand v-else />
      </el-icon>
    </header>
    <el-scrollbar height="calc(100vh - 50px - 32px)">
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/home">
          <el-icon><IconBiSpeedometer2 /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu v-for="menu in menuList" :index="menu.id + ''">
          <template #title>
            <el-icon>
              <component :is="icons[menu.icon!]"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item v-for="sub in menu.children" :index="sub.url">
            {{ sub.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><IconEpMonitor /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/user">用户管理</el-menu-item>
          <el-menu-item index="/range">打卡范围</el-menu-item>
          <el-menu-item index="/issue">通知管理</el-menu-item>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <el-icon><IconIcSharpDiversity1 /></el-icon>
            <span>我的健康</span>
          </template>
          <el-menu-item index="/entering">健康信息录入</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><IconMingcuteEbikeFill /></el-icon>
            <span>校园出入管理</span>
          </template>
          <el-menu-item index="/asking">请假申请</el-menu-item>
          <el-menu-item index="/outside">校外入校申请</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><IconIcOutlineEditLocation /></el-icon>
            <span>健康信息上报</span>
          </template>
          <el-menu-item index="/punch">每日健康打卡</el-menu-item>
          <el-menu-item index="/nucleate">每日核酸上报</el-menu-item>
          <el-menu-item index="/inform">校内疫情通知</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><IconEpPlace /></el-icon>
            <span>疫情防控信息</span>
          </template>
          <el-menu-item index="/whole">全国疫情信息</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import IconEpMonitor from '~icons/ep/monitor'
import IconIcSharpDiversity1 from '~icons/ic/sharp-diversity1'
import IconMingcuteEbikeFill from '~icons/mingcute/ebike-fill'
import IconEpPlace from '~icons/ep/place'
import IconIcOutlineEditLocation from '~icons/ic/outline-edit-location'

const icons: any = {
  IconEpMonitor,
  IconIcSharpDiversity1,
  IconMingcuteEbikeFill,
  IconEpPlace,
  IconIcOutlineEditLocation
}

defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{ (event: 'handleFold'): void }>()

const route = useRoute()

const { menuList } = storeToRefs(useMenu())

const handleFold = () => emits('handleFold')
</script>

<style scoped lang="less">
.menu {
  header {
    display: flex;
    justify-content: v-bind("!isCollapse ? 'space-between' : 'center'");
    align-items: center;
    height: 50px;
    padding: 10px;
    font-size: 22px;
    color: rgb(64, 158, 255);
    background-color: var(--nav-head-color);

    .logo {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-weight: 600;
      font-size: 16px;

      img {
        width: 30px;
        margin-right: 15px;
      }
    }
  }

  .el-menu {
    user-select: none;
    border-right: 0;
    background-color: var(--el-bg-color-overlay);

    .is-active:not(.is-opened):not(.el-sub-menu),
    .is-vertical {
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .scrollbar {
    height: calc(100% - 50px);
  }
}
</style>
