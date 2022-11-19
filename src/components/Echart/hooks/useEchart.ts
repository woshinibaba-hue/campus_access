import * as echarts from 'echarts'

import china from '../data/china.json'

// 注册地图
echarts.registerMap('china', china as any)

export function useEchart(echartEl: HTMLElement) {
  const echart = echarts.init(echartEl)

  const setOptions = (
    options: echarts.EChartsOption | echarts.EChartsCoreOption
  ) => {
    echart.setOption(options)
  }

  return {
    setOptions
  }
}
