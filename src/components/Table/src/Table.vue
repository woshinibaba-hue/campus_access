<template>
  <div class="table">
    <el-table
      :data="data"
      :stripe="stripe"
      style="width: 100%"
      :height="height"
      :highlight-current-row="isRadio"
      :show-header="showHeader"
      @current-change="(d: any) => $emit('selectData', d)"
    >
      <el-table-column
        v-for="i of columns"
        :key="i.prop"
        :prop="i.prop"
        :label="i.label"
        :width="i.width"
      ></el-table-column>
    </el-table>

    <Pagination
      v-if="isPaging"
      v-bind="pagination"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    data: any
    height?: string | number
    stripe?: boolean
    showHeader?: boolean
    isRadio?: boolean
    isPaging?: boolean
    pagination?: TPagination
    columns: {
      prop: string
      label: string
      width?: number
      isTooltip?: boolean
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

const emits = defineEmits<{
  (e: 'selectData', data: any): void
  (e: 'sizeChange', size: number): void
  (e: 'currentChange', page: number): void
}>()

const handleSizeChange = (val: number) => emits('sizeChange', val)
const handleCurrentChange = (val: number) => emits('currentChange', val)
</script>
