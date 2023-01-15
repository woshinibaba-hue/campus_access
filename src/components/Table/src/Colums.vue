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
          <template v-if="i.type === 'date'">
            {{ i.prop && format.formatTime(row[i.prop], i.format) }}
          </template>
          <template v-else-if="i.type === 'action'">
            <el-button
              class="btn-icon"
              type="primary"
              size="small"
              v-if="i.isEdit ?? true"
              @click.stop="$emit('edit', row)"
            >
              <el-icon><IconEpEditPen /></el-icon>
            </el-button>
            <el-popconfirm
              title="确认永久删除该数据？"
              @confirm="$emit('delete', row)"
              v-if="i.isDelete ?? true"
            >
              <template #reference>
                <el-button class="btn-icon" type="danger" size="small">
                  <el-icon><IconAntDesignDeleteFilled /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
          <template v-else-if="i.type === 'object'">
            {{ i.prop && i.field && row[i.prop]?.[i.field] }}
          </template>
          <template v-else-if="i.type === 'url'">
            <el-link type="primary" :href="row[i.prop!]" target="_blank">
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
            <span v-else>暂无头像</span>
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
