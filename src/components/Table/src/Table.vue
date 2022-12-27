<template>
  <div class="table">
    <div class="header" v-if="isHeader">
      <TableHeader :size="size" :columns="columns" :isAdd="isAdd" />
    </div>
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
        v-if="isShowIndex"
        type="index"
        label="序号"
        width="60"
      />
      <template v-for="i of tableCol" :key="i.prop">
        <el-table-column
          v-if="i.isShow"
          :prop="i.prop"
          :label="i.label"
          :width="i.width"
          :show-overflow-tooltip="i.isTooltip ?? true"
          :align="i.align ?? 'left'"
          :fixed="i.isFixed"
        >
          <template #default="{ row }">
            <template v-if="i.slotName === 'date'">
              {{ i.prop && format.formatTime(row[i.prop], i.format) }}
            </template>
            <template v-else-if="i.slotName === 'action'">
              <el-button
                class="btn-icon"
                type="primary"
                plain
                size="small"
                @click.stop="$emit('edit', row)"
              >
                <el-icon><IconEpEdit /></el-icon>编辑
              </el-button>
              <el-button
                class="btn-icon"
                type="danger"
                plain
                size="small"
                @click.stop="$emit('delete', row)"
              >
                <el-icon><IconEpDelete /></el-icon>删除
              </el-button>
            </template>
            <template v-else-if="i.slotName === 'user'">
              {{ i.prop && i.field && row[i.prop][i.field] }}
            </template>
            <template v-else>
              {{ i.prop && row[i.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
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
import TableHeader from './Header.vue'
import format from '@/utils/format'

import { useTable } from '@/store'

const props = withDefaults(
  defineProps<{
    data: any[]
    height?: string | number
    stripe?: boolean
    showHeader?: boolean
    isSelect?: boolean
    isPaging?: boolean
    pagination?: TPagination
    isShowIndex?: boolean
    columns: TableColum[]
    isHeader?: boolean
    isAdd?: boolean
    size?: 'small' | 'large' | 'default'
  }>(),
  {
    stripe: true,
    showHeader: true,
    height: 400,
    isRadio: false,
    isPaging: true,
    isShowIndex: true,
    isAction: true,
    isHeader: true,
    isAdd: true,
    size: 'default'
  }
)

defineEmits<{
  (e: 'selectData', data: any): void
  (e: 'sizeChange', size: number): void
  (e: 'currentChange', page: number): void
  (e: 'edit', data: any): void
  (e: 'delete', data: any): void
  (e: 'add'): void
  (e: 'refresh'): void
}>()

const table = useTable()
const { tableCol } = storeToRefs(table)

table.init(props.columns)
</script>

<style lang="less" scoped>
:deep(.el-table__inner-wrapper) {
  &::before {
    height: 0;
  }
}

.btn-icon {
  margin-right: 4px;
}
</style>
