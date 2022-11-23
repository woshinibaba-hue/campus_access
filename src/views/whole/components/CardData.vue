<template>
  <div class="card">
    <p class="title">{{ name }}</p>
    <p class="num"><Count :num="isNaN(num!) ? 0 : num" /></p>
    <p class="today">
      <template v-if="todayNum">
        较昨日<span class="num"> +<Count :num="todayNum" /> </span>
      </template>
      <template v-else>较昨日待公布</template>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color: string
  name: string
  num: number
  todayNum: number
}>()
</script>

<style scoped lang="less">
.card {
  text-align: center;
  margin-bottom: 30px;

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
