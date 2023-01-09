<template>
  <countTo :startVal="0" :endVal="num" :duration="2000" />
</template>

<script setup lang="ts">
import countTo from './vue-countTo.vue'

defineProps<{
  num: number
}>()
</script>

<style scoped></style>
