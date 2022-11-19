<template>
  <Echart :option="option" />
</template>

<script setup lang="ts">
import Echart from './Echart.vue'

const data = [
  {
    name: '江苏省',
    value: 281721
  },
  {
    name: '北京市',
    value: 281721
  },
  {
    name: '上海',
    value: 281721
  },
  {
    name: '重庆',
    value: 3.6
  },
  {
    name: '河北',
    value: 3.4
  },
  {
    name: '河南',
    value: 3.2
  },
  {
    name: '云南',
    value: 1.6
  },
  {
    name: '辽宁',
    value: 4.3
  },
  {
    name: '黑龙江',
    value: 4.1
  },
  {
    name: '湖南',
    value: 2.4
  },
  {
    name: '安徽',
    value: 3.3
  },
  {
    name: '山东',
    value: 3.0
  },
  {
    name: '新疆',
    value: 1
  },
  {
    name: '江苏',
    value: 3.9
  },
  {
    name: '浙江',
    value: 3.5
  },
  {
    name: '江西',
    value: 2.0
  },
  {
    name: '湖北',
    value: 2.1
  },
  {
    name: '广西',
    value: 22
  },
  {
    name: '甘肃',
    value: 1.2
  },
  {
    name: '山西',
    value: 543
  },
  {
    name: '内蒙古',
    value: 213
  },
  {
    name: '陕西',
    value: 232
  },
  {
    name: '吉林',
    value: 43213
  },
  {
    name: '福建',
    value: 2121
  },
  {
    name: '贵州',
    value: 1.8
  },
  {
    name: '广东',
    value: 3.7
  },
  {
    name: '青海',
    value: 3131
  },
  {
    name: '西藏',
    value: 0.4
  },
  {
    name: '四川',
    value: 3.3
  },
  {
    name: '宁夏',
    value: 0.8
  },
  {
    name: '海南',
    value: 1.9
  },
  {
    name: '台湾',
    value: 212
  },
  {
    name: '香港',
    value: 21313
  },
  {
    name: '澳门',
    value: 21
  }
]

const yData = []
const barData = []

for (let i = 0; i < 10; i++) {
  barData.push(data[i])
  yData.push(i + data[i].name)
}

const option: echarts.EChartsOption | echarts.EChartsCoreOption = {
  title: [
    {
      show: true,
      text: '全国疫情图',
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
      return params.name + '：' + params.data['value']
    }
  },
  visualMap: {
    // type: 'continuous',
    // orient: 'horizontal',
    itemWidth: 10,
    itemHeight: 80,
    text: ['高风险', '低风险'],
    showLabel: true,
    seriesIndex: [0],
    min: 0,
    max: 10000,
    inRange: {
      color: ['#6FCF6A', '#FFFD64', '#FF5000']
    },
    textStyle: {
      color: '#7B93A7'
    },
    bottom: 30,
    left: 'left'
  },
  geo: {
    // roam: true,
    map: 'china',
    // left: 'left',
    // right: '300',
    // layoutSize: '80%',
    label: {
      show: false
    },
    itemStyle: {
      areaColor: '#fff464'
    }
  },
  series: [
    {
      name: 'mapSer',
      type: 'map',
      roam: false,
      geoIndex: 0,
      label: {
        show: false
      },
      data: data
    }
  ]
}
</script>
