<template>
  <div class="card">
    <p class="title">境外输入</p>
    <p class="num">26773</p>
    <p class="today">较昨日<span class="num">+168</span></p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<style scoped lang="less">
.card {
  text-align: center;
  margin-bottom: 25px;

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
  }

  .num {
    font-weight: 600;
    font-size: 25px;
    line-height: 55px;
    color: v-bind(color);
  }

  .today {
    color: #999;
    font-size: 14px;

    .num {
      font-size: 14px;
      line-height: unset;
    }
  }
}
</style>
