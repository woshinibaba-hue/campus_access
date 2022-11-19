<template>
  <div class="card">
    <p class="title">{{ name }}</p>
    <p class="num">{{ num }}</p>
    <p class="today">
      较昨日<span class="num">+{{ todayNum }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color: string
  name: string
  num?: number
  todayNum: number
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
