<template>
  <el-row justify="space-between">
    <el-col :span="12">
      <el-button
        type="primary"
        :size="size"
        @click="$emit('add')"
        v-if="isAdd && isPermissionAdd"
        class="addBtn"
      >
        <el-icon class="btn-icon"><IconEpCirclePlus /></el-icon>
        {{ addText ?? '新增' }}
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
                  @change="table.handleCheckChange"
                />
              </el-col>
              <el-col :span="12" class="justify-end">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="table.handleCheckChange(true, true)"
                >
                  重置
                </el-link>
              </el-col>
            </el-row>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-scrollbar max-height="400px">
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  v-for="i in columnList"
                  :key="i.field ?? i.prop"
                  :label="i.label"
                  @change="table.updateTableCol(i)"
                />
              </el-checkbox-group>
            </el-scrollbar>
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
</template>

<script setup lang="ts">
import { useTable } from '@/store'

defineProps<{
  isAdd?: boolean
  size?: 'small' | 'large' | 'default'
  addText?: string
  isPermissionAdd?: boolean
}>()

const table = useTable()
const { columnList, checkList, checkAll, isIndeterminate } = storeToRefs(table)
</script>

<style lang="less" scoped>
.el-row {
  border-bottom: 1px solid var(--el-border-color);
  padding-bottom: 15px;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
}

.el-dropdown-menu {
  padding: 0 10px;
}

.addBtn {
  span {
    .btn-icon {
      font-size: 1.2em;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }
}

.header {
  margin-bottom: 5px;
}

.dropdown-head {
  border-bottom: 1px solid var(--el-border-color);
}

.icon {
  font-size: v-bind(
    "size === 'default' ? '18px' : size === 'large' ? '24px' : ''"
  );
}
</style>
