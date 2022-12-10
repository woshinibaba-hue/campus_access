<template>
  <TabNavs :isCloseOnterTabs="isCloseOnterTabs" />
</template>

<script setup lang="ts">
import { TabNavs } from '@/components/NavTabs'
defineProps<{
  isCloseOnterTabs: boolean
}>()
</script>

<style scoped lang="less"></style>
