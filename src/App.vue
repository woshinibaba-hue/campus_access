<template>
  <div>Vite + Vue</div>
  <h3>当前计数: {{ count }}</h3>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCount } from '@/store'

const countStore = useCount()

const { count } = storeToRefs(countStore)
const { increment, decrement } = useCount()
</script>

<style scoped></style>
