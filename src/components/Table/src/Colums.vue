<template>
  <el-table-column v-if="isShowIndex" type="index" label="序号" :width="60" />
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
          <template v-if="i.slotName === 'date'">
            {{ i.prop && format.formatTime(row[i.prop], i.format) }}
          </template>
          <template v-else-if="i.slotName === 'action'">
            <el-button
              class="btn-icon"
              type="primary"
              size="small"
              @click.stop="$emit('edit', row)"
            >
              <el-icon><IconEpEditPen /></el-icon>
            </el-button>
            <el-popconfirm
              title="确认永久删除该数据？"
              @confirm="$emit('delete', row)"
            >
              <template #reference>
                <el-button class="btn-icon" type="danger" size="small">
                  <el-icon><IconAntDesignDeleteFilled /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
          <template v-else-if="i.slotName === 'user'">
            {{ i.prop && i.field && row[i.prop][i.field] }}
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

defineProps<{
  isShowIndex?: boolean
}>()

defineEmits<{
  (e: 'edit', data: any): void
  (e: 'delete', data: any): void
}>()

const table = useTable()
const { tableCol } = storeToRefs(table)
</script>
