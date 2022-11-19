<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    router
    unique-opened
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><IconEpPlatform /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">用户管理</el-menu-item>
        <el-menu-item index="1-2">角色管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><IconEpPlace /></el-icon>
        <span>疫情防控信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/whole">全国疫情信息</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>
