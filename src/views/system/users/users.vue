<template>
  <div class="users">
    <Card title="用户管理">
      <Table
        :data="data?.data"
        v-bind="tableConfigComputed"
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
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dialog.config'

const { data, refresh } = useLoading(getUserAll)

const roles = ref<any[]>([])

getRole({ limit: 500, page: 1 }).then(res => {
  roles.value = res.data.data.map(r => ({ label: r.name, value: r.id }))
})

const computedDialogConfig = computed(() => ({
  ...dialogConfig,
  form: {
    columns: [
      {
        field: 'nickName',
        lable: '用户昵称'
      },
      {
        field: 'email',
        lable: '用户邮箱'
      },
      {
        field: 'referral',
        lable: '个性签名'
      },
      {
        field: 'rolesId',
        lable: '用户角色',
        type: 'select',
        options: roles.value
      }
    ],
    isAction: false
  }
}))

const dialogVisible = ref(false)

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total
  }
}))

const { handleDelete, editItem, confirm, handleEdit } = useTableUtil({
  refresh,
  dialogVisible,
  deleteFn: deleteUserById,
  editFn: async (formData: any) => {
    await updateUser({
      id: formData.id,
      nickName: formData.nickName,
      email: formData.email,
      referral: formData.referral,
      rolesId: formData.rolesId
    })
  }
})
</script>

<style scoped lang="less"></style>
