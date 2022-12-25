<template>
  <div class="punch-ccrd">
    <p class="title">{{ title }}</p>
    <div class="icon">
      <el-icon v-if="!isUnusual"><IconEpCircleCheckFilled /></el-icon>
      <el-icon size="40" v-else><IconBiExclamationCircleFill /></el-icon>
    </div>
    <p class="data">{{ data }}</p>
    <p class="res">{{ !isUnusual ? '正常' : '异常' }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isUnusual?: boolean
    title: string
    data?: string
  }>(),
  {
    isUnusual: false
  }
)
</script>

<style scoped lang="less">
.punch-ccrd {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #fff;
  background: v-bind("isUnusual ? '#F7616D' : '#18D080'");
  box-shadow: var(--el-box-shadow-light);
  padding: 10px 0;
  border-radius: 12px;

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .icon {
    font-size: 45px;
  }

  .data {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .res {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
