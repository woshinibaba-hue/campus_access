<template>
  <div class="echart" ref="echartRef" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

import { useEchart } from '../hooks/useEchart'

const echartRef = ref<HTMLDivElement>()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: echarts.EChartsCoreOption | echarts.EChartsOption
  }>(),
  {
    width: '100%',
    height: '500px'
  }
)

onMounted(() => {
  // 当 options 发生变化时，重新渲染图表
  nextTick(() => {
    const { setOptions } = useEchart(echartRef.value!)

    watchEffect(() => {
      setOptions(props.option)
    })
  })
})
</script>
