<template>
  <!-- <div>Vite + Vue</div>
  <h3>当前计数: {{ count }}</h3>
  <el-button type="primary" @click="increment">+1</el-button>
  <el-button @click="decrement">-1</el-button>
  <RouterLink to="/">首页</RouterLink>
  <RouterLink to="/about">关于</RouterLink>
  <el-input v-model="value" />
  <h3>当前输入框值：{{ value }}</h3>

  <div class="box">
    <div class="name">哈哈哈哈就</div>
  </div> -->

  <RouterView />
</template>

<script setup lang="ts">
// import { useCount } from '@/store'

// const countStore = useCount()

// const { count } = storeToRefs(countStore)
// const { increment, decrement } = useCount()

// const value = ref('')
</script>

<style scoped lang="less">
.box {
  .name {
    color: red;
  }
}
</style>
