<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    router
    unique-opened
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <el-menu-item index="/home">
      <el-icon><IconAntDesignDashboardFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><IconEpPlatform /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user">用户管理</el-menu-item>
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
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
const route = useRoute()

defineProps<{
  isCollapse: boolean
}>()
</script>

<style scoped>
.el-menu {
  user-select: none;
  border-right: 0;
}
</style>
