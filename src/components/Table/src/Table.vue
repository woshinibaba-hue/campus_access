<template>
  <div class="table">
    <div class="header" v-if="isHeader">
      <TableHeader
        :size="size"
        :columns="columns"
        :isAdd="isAdd"
        @refresh="$emit('refresh')"
      />
    </div>
    <el-table
      v-load="isLoading"
      :data="data"
      :stripe="stripe"
      style="width: 100%"
      :height="height"
      :highlight-current-row="isSelect"
      :show-header="showHeader"
      @current-change="(d: any) => $emit('selectData', d)"
    >
      <TableColumn
        :isShowIndex="isShowIndex"
        @edit="data => $emit('edit', data)"
        @delete="data => $emit('delete', data)"
      />
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
import TableColumn from './Colums.vue'

import { useTable } from '@/store'

const props = withDefaults(
  defineProps<{
    data?: any[]
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
    isLoading?: boolean
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
    size: 'default',
    isLoading: false
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

const { init } = useTable()
init(props.columns)
</script>

<style lang="less" scoped>
:deep(.el-table__inner-wrapper) {
  &::before {
    height: 0;
  }
}

:deep(.el-table__row) {
  height: 40px;
}

.btn-icon {
  margin-right: 4px;
}
</style>
