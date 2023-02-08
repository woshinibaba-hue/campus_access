<template>
  <Card title="角色管理" :loading="isLoading">
    <Table
      v-bind="tableConfigComputed"
      :data="data?.data"
      @add="dialogVisible = true"
      @delete="handleDelete"
      @edit="handleEdit"
      @refresh="refresh"
    >
    </Table>

    <Dialog
      v-bind="dialogConfig"
      v-model="dialogVisible"
      v-model:edit="editItem"
      @confirm="confirm"
      @close="close"
      @open="open"
    >
      <el-form-item label="角色权限">
        <el-tree
          :data="menuList"
          style="flex: 1"
          ref="treeRef"
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          show-checkbox
          @check="handleCheck"
        />
      </el-form-item>
    </Dialog>
  </Card>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'
import { ElTree } from 'element-plus'
import mapRouters from '@/utils/mapRouters'

const dialogVisible = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>()

// const { menuList } = storeToRefs(useMenu())

const menuList = ref<any>([])

const { data, isLoading, refresh } = useLoading(getRole)
getMenuList({ page: 1, limit: 500 }).then(res => {
  // console.log(mapRouters.transformTree(res.data.data))
  menuList.value = mapRouters.transformTreeData(res.data.data)
})

const tableConfigComputed = computed<TableConfig<any>>(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total
  }
}))

// 当树形控件勾选时触发
const checkList = ref<number[]>([])
const handleCheck = (_: any, checkedKeys: any) => {
  console.log([...checkedKeys.checkedKeys, ...checkedKeys.halfCheckedKeys])

  checkList.value = [...checkedKeys.checkedKeys, ...checkedKeys.halfCheckedKeys]
}

const { confirm, handleDelete, handleEdit, editItem } = useTableUtil({
  dialogVisible,
  refresh,
  addFn: async (formData: any) => {
    await createRole({ ...formData, menuList: checkList.value })
  },
  editFn: async (formData: any) => {
    const menu = formData.menu.map((v: any) => v.menuId)

    console.log(menu)

    const menuList = Array.from(new Set([...menu, ...checkList.value]))
    await updateRole({
      menuList: checkList.value,
      id: formData.id,
      intro: formData.intro,
      name: formData.name
    })
  },
  deleteFn: deleteRole
})

const close = () => treeRef.value?.setCheckedKeys([])
const open = () => {
  const nodes =
    mapRouters.transformTreeData(editItem.value.menu, 'menuId') ?? []
  const checkKeys = mapRouters.checkTreeKeys(nodes, 'menuId')
  nextTick(() => {
    treeRef.value?.setCheckedKeys(checkKeys)
  })
}
</script>

<style lang="less" scoped></style>
