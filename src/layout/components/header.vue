<template>
  <el-row :gutter="20" justify="space-between" align="middle">
    <el-col :span="12">
      <el-icon @click="handleFold">
        <IconEpFold v-if="!isCollapse" />
        <IconEpExpand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">promotion management</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="12">
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎回来 <span class="name">{{ user?.nickName }}</span>
        </span>
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
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useUser } from '@/store'

const userData = useUser()
const { user } = storeToRefs(userData)

defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{
  (e: 'handleFold'): void
}>()

const handleFold = () => {
  emits('handleFold')
}
</script>

<style scoped lang="less">
.el-row {
  height: 100%;
  user-select: none;

  .el-col {
    display: flex;
    align-items: center;

    &:last-child {
      justify-content: flex-end;
    }

    .el-icon {
      cursor: pointer;
      font-size: 20px;
      margin-right: 15px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;

    .name {
      font-size: 20px;
    }
  }
}
</style>
