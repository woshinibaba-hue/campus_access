<template>
  <div class="range">
    <Card title="打卡范围" :loading="isLoading">
      <el-alert
        title="打卡范围设定，默认打卡范围为图中高亮区域，如需更改可以双击高亮区域，修改之后，点击结束编辑按钮即可"
        type="warning"
        show-icon
        :closable="false"
      />
      <Table :data="newPath" v-bind="tableConfig" />
    </Card>
    <Card :loading="isLoading">
      <div id="container"></div>
      <div class="tool">
        <el-button @click="polyEditor.open()" size="small" plain type="primary">
          开始编辑
        </el-button>
        <br />
        <el-button
          @click="polyEditor.close()"
          size="small"
          plain
          type="primary"
        >
          结束编辑
        </el-button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/Table'
import AMapLoader from '@amap/amap-jsapi-loader'
import { tableConfig } from './config/table.config'
import { savePath, getPath } from '@/api/punch'
import { useLoading } from '@/hooks'

const path = ref([])
const newPath = ref<{ latitude: number; longitude: number }[]>([])

let polyEditor: any

const initMap = async () => {
  // 初始化
  const AMap = await AMapLoader.load({
    key: '2a28b1630da4f43eb85913b5f81d17bb',
    version: '2.0'
  })

  // 初始化中心点位置
  let initPath = [114.338604, 30.348775]

  // 设置中心点位置
  if (path.value.length) {
    initPath = path.value[0]
  }

  const map = new AMap.Map('container', {
    viewMode: '3D',
    zoom: 15.8,
    center: initPath //初始化地图中心点位置
  })

  // 添加插件
  map.plugin(['AMap.MapType'], function () {
    map.addControl(new AMap.MapType()) //实现默认图层与卫星图、实施交通图层之间切换的控件
  })
  map.plugin(['AMap.HawkEye'], () => {
    map.addControl(new AMap.HawkEye())
  })
  map.plugin(['AMap.PolygonEditor'], function () {
    polyEditor = new AMap.PolygonEditor(map)
  })
  map.plugin(['AMap.ToolBar'], function () {
    map.addControl(
      new AMap.ToolBar({
        position: {
          top: '130px',
          right: '20px'
        }
      })
    )
  })
  map.plugin(['AMap.Scale'], function () {
    map.addControl(new AMap.Scale()) // 比例尺条控件
  })

  const polygon = new AMap.Polygon({
    path: path.value
  })
  map.add([polygon])
  polyEditor.addAdsorbPolygons([polygon])
  polyEditor.on('add', function (data: any) {
    console.log(data)
    var polygon = data.target
    polyEditor.addAdsorbPolygons(polygon)
    polygon.on('dblclick', () => {
      polyEditor.setTarget(polygon)
      polyEditor.open()
    })
  })

  // 编辑多边形
  const edit = () => {
    polyEditor.setTarget(polygon)
    polyEditor.open()
  }
  // 双击多边形，触发编辑
  polygon.on('dblclick', edit)

  // 编辑结束之后，获取到最新的经纬度
  polyEditor.on('end', (e: any) => {
    path.value = e.target._opts.path
    newPath.value = path.value.map((v: any) => ({
      latitude: v[1],
      longitude: v[0]
    }))
    savePath(JSON.stringify(newPath.value))
  })
}

const { data, isLoading } = useLoading(getPath)

watch(
  () => data.value,
  () => {
    newPath.value = JSON.parse(data.value.location)
    path.value = JSON.parse(data.value.location).map((v: any) => [
      v.longitude,
      v.latitude
    ])
    nextTick(() => initMap())
  }
)
</script>

<style lang="less" scoped>
.range {
  display: flex;
  justify-content: space-around;

  .el-card {
    :deep(.el-card__body) {
      padding: 0;
      width: 100%;
      height: 100%;
    }

    &:last-child {
      position: relative;
      width: 875px;
      margin-left: 20px;
    }

    &:first-child {
      width: 330px;
      padding: 10px;

      :deep(.el-card__body) {
        padding: 0;
        width: 100%;
        height: 100%;
      }
    }

    .tool {
      position: absolute;
      top: 215px;
      right: 20px;
      background-color: #fff;
      background-clip: border-box;
      border-radius: 0.25rem;
      border-width: 0;
      border-radius: 0.4rem;
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
      padding: 0.55rem 0.75rem;

      .el-button:first-child {
        margin-bottom: 10px;
      }
    }
  }
}

.toolbar {
  padding: 10px;
}

#container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>
