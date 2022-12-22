<template>
  <div class="table">
    <el-table
      :data="data"
      :stripe="stripe"
      style="width: 100%"
      :height="height"
      :highlight-current-row="isSelect"
      :show-header="showHeader"
      @current-change="(d: any) => $emit('selectData', d)"
    >
      <el-table-column
        v-for="i of columns"
        :key="i.prop"
        :prop="i.prop"
        :label="i.label"
        :width="i.width"
        :show-overflow-tooltip="i.isTooltip ?? true"
        :align="i.align ?? 'left'"
      >
        <template #default="{ row }">
          <template v-if="i.slotName === 'date'">
            {{ format.formatTime(row[i.prop], i.format) }}
          </template>
          <template v-else>
            {{ row[i.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-if="isPaging"
      v-bind="pagination"
      @sizeChange="(val: number) => $emit('sizeChange', val)"
      @currentChange="(val: number) => $emit('currentChange', val)"
    />
  </div>
</template>

<script setup lang="ts">
import format from '@/utils/format'
withDefaults(
  defineProps<{
    data: any[]
    height?: string | number
    stripe?: boolean
    showHeader?: boolean
    isSelect?: boolean
    isPaging?: boolean
    pagination?: TPagination
    columns: {
      prop: string
      label: string
      width?: number
      isTooltip?: boolean
      slotName?: string
      align?: 'left' | 'center' | 'right'
      format?: string
    }[]
  }>(),
  {
    stripe: true,
    showHeader: true,
    height: 500,
    isRadio: false,
    isPaging: true
  }
)

defineEmits<{
  (e: 'selectData', data: any): void
  (e: 'sizeChange', size: number): void
  (e: 'currentChange', page: number): void
}>()
</script>

<style lang="less" scoped>
:deep(.el-table__inner-wrapper) {
  &::before {
    height: 0;
  }
}
</style>
