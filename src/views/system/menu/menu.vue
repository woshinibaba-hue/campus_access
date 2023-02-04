<template>
  <Card title="菜单管理" :loading="isLoading">
    <Table
      v-bind="tableCondig"
      :data="data?.data"
      :pagination="{ total: data?.total }"
      @add="dialogVisible = true"
      @currentChange="handleCurrentChange"
      @delete="handleDelete"
      @edit="handleEdit"
    />

    <Dialog
      v-bind="computedDialogConfig"
      v-model="dialogVisible"
      v-model:edit="editItem"
      @confirm="confirm"
    />
  </Card>
</template>

<script setup lang="ts">
import { tableCondig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const dialogVisible = ref(false)
const { data, isLoading, pages, refresh } = useLoading(getMenuList)

const { confirm, handleDelete, editItem, handleEdit } = useTableUtil({
  dialogVisible,
  refresh,
  addFn: createMenu,
  editFn: editMenuById,
  deleteFn: deleteMenu
})

const parentList = ref<any[]>([])

const computedDialogConfig = computed(() => ({
  ...dialogConfig,
  form: {
    ...dialogConfig.form,
    columns: [
      ...dialogConfig.form!.columns,
      {
        lable: '父级菜单',
        field: 'parentId',
        placeholder: '请选择父级菜单',
        type: 'el-select',
        options: parentList.value
      }
    ]
  }
}))

const handleCurrentChange = (page: number) => (pages.page = page)

watchEffect(() => {
  if (dialogVisible.value) {
    getMenuList({
      page: 1,
      limit: 500
    }).then(res => {
      parentList.value = res.data.data.map(i => ({
        label: `${i.type} → ${i.name}`,
        value: i.id
      }))
    })
  }
})
</script>

<style scoped lang="less"></style>
