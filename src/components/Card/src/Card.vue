<template>
  <el-card class="card" v-load="loading">
    <p v-if="title" class="title">{{ title }}</p>
    <slot />
  </el-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean
    title?: string
  }>(),
  {
    loading: false
  }
)
</script>

<style scoped lang="less">
.card {
  margin-bottom: 10px;

  .title {
    font-size: 20px;
    padding-left: 12px;
    border-left: 4px solid var(--el-color-primary);
    margin-bottom: 20px;
  }
}
</style>
