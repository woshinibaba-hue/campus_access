<template>
  <el-pagination
    class="pagination"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="sizes"
    :small="small"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
const currentPage = ref(1)
const pageSize = ref(10)

withDefaults(
  defineProps<{
    total: number
    small?: boolean
    sizes?: number[]
    layout?: string // total, sizes, prev, pager, next, jumper
  }>(),
  {
    small: true,
    total: 100,
    layout: 'total, prev, pager, next'
  }
)

const emits = defineEmits<{
  (e: 'sizeChange', size: number): void
  (e: 'currentChange', page: number): void
}>()

const handleSizeChange = (val: number) => emits('sizeChange', val)
const handleCurrentChange = (val: number) => emits('currentChange', val)
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
