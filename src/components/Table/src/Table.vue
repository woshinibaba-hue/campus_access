<template>
  <div class="table">
    <div class="header" v-if="isHeader">
      <TableHeader
        :size="size"
        :columns="columns"
        :isAdd="isAdd"
        :add-text="addText"
        v-bind="permission"
        @refresh="$emit('refresh')"
        @add="$emit('add')"
      />
    </div>
    <el-table
      row-key="id"
      :size="size"
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
        :isFixedIndex="isFixedIndex"
        :isShowIndex="isShowIndex"
        :is-show-expand="isShowExpand"
        v-bind="permission"
        @edit="data => $emit('edit', data)"
        @delete="data => $emit('delete', data)"
        @consent="data => $emit('consent', data)"
        @refuse="data => $emit('refuse', data)"
      >
        <template #default="{ row }">
          <slot :row="row" />
        </template>
      </TableColumn>
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
import { usePermission } from '@/hooks/usePermission'

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
    addText?: string
    isFixedIndex?: boolean
    isShowExpand?: boolean
    permissionName?: string
  }>(),
  {
    stripe: true,
    showHeader: true,
    height: 400,
    isRadio: false,
    isPaging: true,
    isShowIndex: true,
    isHeader: true,
    isAdd: true,
    size: 'default',
    isLoading: false
  }
)

const permission = reactive({
  isPermissionAdd: false,
  isPermissionEdit: false,
  isPermissionDelete: false
})

defineEmits<{
  (e: 'selectData', data: any): void
  (e: 'sizeChange', size: number): void
  (e: 'currentChange', page: number): void
  (e: 'edit', data: any): void
  (e: 'delete', data: any): void
  (e: 'consent', data: any): void
  (e: 'refuse', data: any): void
  (e: 'add'): void
  (e: 'refresh'): void
}>()

if (props.permissionName) {
  permission.isPermissionAdd = usePermission(props.permissionName, 'add')
  permission.isPermissionEdit = usePermission(props.permissionName, 'edit')
  permission.isPermissionDelete = usePermission(props.permissionName, 'delete')

  console.log(permission)
}

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

:deep(th) {
  color: var(--el-text-color-primary);
}

.btn-icon {
  margin-right: 4px;
}
</style>
