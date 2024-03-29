<template>
  <el-table-column label="展开" width="80" type="expand" v-if="isShowExpand">
    <template #default="{ row }">
      <slot :row="row" />
    </template>
  </el-table-column>
  <el-table-column
    v-if="isShowIndex"
    type="index"
    label="序号"
    :width="60"
    :fixed="isFixedIndex"
  />
  <template v-for="i of tableCol" :key="i.prop">
    <el-table-column
      :prop="i.prop"
      :label="i.isShow ? i.label : ''"
      :width="i.width"
      :show-overflow-tooltip="i.isTooltip ?? true"
      :align="i.align ?? 'left'"
      :fixed="i.isShow && i.isFixed"
    >
      <template #default="{ row }">
        <template v-if="i.isShow">
          <template v-if="i.type === 'date'">
            {{ i.prop && format.formatTime(row[i.prop], i.format) }}
          </template>
          <template v-else-if="i.type === 'action'">
            <el-button
              class="btn-icon"
              type="primary"
              :size="size"
              v-if="(i.isEdit ?? true) && isPermissionEdit"
              @click.stop="$emit('edit', row)"
            >
              <el-icon><IconEpEditPen /></el-icon>
            </el-button>
            <el-popconfirm
              title="确认永久删除该数据？"
              @confirm="$emit('delete', row)"
              v-if="(i.isDelete ?? true) && isPermissionDelete"
            >
              <template #reference>
                <el-button class="btn-icon" type="danger" :size="size">
                  <el-icon><IconAntDesignDeleteFilled /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
          <template v-else-if="i.type === 'object'">
            {{ i.prop && i.field && getObj(row[i.prop], i.field) }}
          </template>
          <template v-else-if="i.type === 'url'">
            <el-link
              type="primary"
              :href="format.formatUrl(row[i.prop!])"
              target="_blank"
            >
              {{ row[i.prop!] }}
            </el-link>
          </template>
          <template v-else-if="i.type === 'image'">
            <el-image
              v-if="row[i.prop!]"
              style="width: 100px; height: 130px"
              fit="cover"
              :url="row[i.prop!]"
            />
            <span v-else>暂无{{ row[i.prop!] }}</span>
          </template>
          <template v-else-if="i.type === 'icon'">
            <el-icon>
              <component :is="icons[row[i.prop!]]"></component>
            </el-icon>
          </template>
          <template v-else-if="i.type === 'audit'">
            <el-button
              type="primary"
              :size="size"
              @click.stop="$emit('consent', row)"
              :disabled="row[i.field!] !== 0"
            >
              同意
            </el-button>
            <el-button
              type="danger"
              :size="size"
              @click.stop="$emit('refuse', row)"
              :disabled="row[i.field!] !== 0"
            >
              拒绝
            </el-button>
          </template>
          <template v-else-if="i.type === 'select'">
            {{ getVlaue(i.options!, row[i.prop!]) }}
          </template>
          <template v-else>
            {{ i.prop && row[i.prop] }}
          </template>
        </template>
        <template v-else></template>
      </template>
    </el-table-column>
  </template>
</template>

<script setup lang="ts">
import format from '@/utils/format'
import { useTable } from '@/store'

import IconEpMonitor from '~icons/ep/monitor'
import IconIcSharpDiversity1 from '~icons/ic/sharp-diversity1'
import IconMingcuteEbikeFill from '~icons/mingcute/ebike-fill'
import IconEpPlace from '~icons/ep/place'
import IconIcOutlineEditLocation from '~icons/ic/outline-edit-location'
import { log } from 'console'

const icons: any = {
  IconEpMonitor,
  IconIcSharpDiversity1,
  IconMingcuteEbikeFill,
  IconEpPlace,
  IconIcOutlineEditLocation
}

const props = withDefaults(
  defineProps<{
    isShowIndex?: boolean
    isFixedIndex?: boolean
    isShowExpand?: boolean
    size?: 'small' | 'large' | 'default'
    isPermissionDelete?: boolean
    isPermissionEdit?: boolean
  }>(),
  {
    size: 'default'
  }
)

defineEmits<{
  (e: 'edit', data: any): void
  (e: 'delete', data: any): void
  (e: 'consent', data: any): void
  (e: 'refuse', data: any): void
}>()

const table = useTable()
const { tableCol } = storeToRefs(table)

const getObj = (obj: any, field: string) => {
  if (field.includes('.')) {
    const arr = field.split('.')
    let value = obj
    arr.forEach(k => {
      value = value[k]
    })
    return value
  } else {
    return obj?.[field]
  }
}

const getVlaue = (options: any[], value: any) => {
  return options.filter(v => v.value === value)[0]?.label
}
</script>
