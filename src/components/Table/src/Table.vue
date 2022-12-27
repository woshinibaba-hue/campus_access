<template>
  <div class="table">
    <div class="header" v-if="isHeader">
      <el-row justify="space-between">
        <el-col :span="12">
          <el-button
            type="primary"
            plain
            :size="size"
            @click="$emit('add')"
            v-if="isAdd"
          >
            <el-icon class="btn-icon"><IconEpCirclePlus /></el-icon>
            新增
          </el-button>
        </el-col>
        <el-col :span="12" class="justify-end">
          <el-dropdown trigger="click">
            <i>
              <el-tooltip content="列筛选" placement="top">
                <el-icon class="icon">
                  <IconEpSetting />
                </el-icon>
              </el-tooltip>
            </i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-row class="dropdown-head">
                  <el-col :span="12">
                    <el-checkbox
                      label="列筛选"
                      v-model="checkAll"
                      :indeterminate="isIndeterminate"
                      @change="handleCheckChange"
                    />
                  </el-col>
                  <el-col :span="12" class="justify-end">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="handleCheckChange(true, true)"
                    >
                      重置
                    </el-link>
                  </el-col>
                </el-row>
              </el-dropdown-menu>
              <el-dropdown-menu>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    v-for="i in columns"
                    :key="i.prop"
                    :label="i.label"
                    @change="handleChecknox(i)"
                  />
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-tooltip content="刷新" placement="top">
            <el-icon
              class="icon"
              style="margin-left: 10px"
              @click="$emit('refresh')"
            >
              <IconEpRefreshLeft />
            </el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
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
import format from '@/utils/format'

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

const tableCol = ref<TableColum[]>([])

const checkAll = ref(true)
const isIndeterminate = ref(false)
const checkList = ref<string[]>([])

watch(
  () => props.columns,
  () => {
    tableCol.value = props.columns.map((v) => ({
      ...v,
      isShow: true
    }))
    tableCol.value.forEach((v) => checkList.value.push(v.label))
  },
  {
    immediate: true
  }
)

const handleChecknox = (col: TableColum) => {
  tableCol.value.forEach((v) => {
    if (v.label === col.label) {
      v.isShow = !v.isShow
    }
  })
  isIndeterminate.value = checkList.value.length !== props.columns.length
}

const handleCheckChange = (check: boolean, isReset = false) => {
  if (check) {
    tableCol.value = props.columns.map((v) => ({
      ...v,
      isShow: true
    }))
    tableCol.value.forEach((v) => checkList.value.push(v.label))
    isReset && (checkAll.value = true)
  } else {
    tableCol.value = []
    checkList.value = []
  }

  isIndeterminate.value = false
}
</script>

<style lang="less" scoped>
:deep(.el-table__inner-wrapper) {
  &::before {
    height: 0;
  }
}

.header {
  margin-bottom: 5px;
}

.dropdown-head {
  border-bottom: 1px solid var(--el-border-color);
}

.btn-icon {
  margin-right: 4px;
}

.el-dropdown-menu {
  padding: 0 10px;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
}

.icon {
  font-size: v-bind(
    "size === 'default' ? '18px' : size === 'large' ? '24px' : ''"
  );
}
</style>
