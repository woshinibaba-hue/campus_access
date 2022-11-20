<template>
  <Echart :option="option" />
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'
import Echart from './Echart.vue'

const props = defineProps<{
  data: any[]
}>()

const option: ComputedRef<echarts.EChartsOption | echarts.EChartsCoreOption> =
  computed(() => ({
    title: [
      {
        show: true,
        // text: '全国疫情图',
        textStyle: {
          color: '#333',
          fontSize: 20,
          fontWeight: 400
        },
        right: 'center'
      }
    ],
    tooltip: {
      show: true,
      formatter: function (params: any) {
        return `<p>现有确诊病例</p><p>${params.name}: ${params.data['value']}</p>`
      }
    },
    visualMap: {
      itemWidth: 10,
      itemHeight: 80,
      text: ['高', '低'],
      showLabel: true,
      min: 0,
      max: 2000,
      inRange: {
        color: [
          '#fff',
          '#fff2cf',
          '#fdd2a0',
          '#ff8c71',
          '#e64b45',
          '#bd1316',
          '#7f1100'
        ]
      },
      textStyle: {
        color: '#7B93A7'
      },
      bottom: 30,
      left: 'center'
    },
    geo: {
      map: 'china',
      width: '100%',
      height: '100%',
      label: {
        show: true, // 省份展示
        color: '#333',
        fontSize: '10px'
      },
      itemStyle: {
        areaColor: '#fff464'
      }
    },
    series: [
      {
        type: 'map',
        roam: false,
        geoIndex: 0,
        data: props.data
      }
    ]
  }))
</script>
