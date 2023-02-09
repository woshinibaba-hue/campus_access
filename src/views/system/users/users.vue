<template>
  <div class="users">
    <Card title="查询">
      <Form v-bind="computedFormConfig" v-model="formData" @submit="submit" />
    </Card>

    <Card title="用户管理" :loading="isLoading">
      <Table
        :data="data?.data"
        v-bind="tableConfigComputed"
        @delete="handleDelete"
        @edit="handleEdit"
        @refresh="refresh"
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
import { roleConfig } from './config/form.config'

const formData = ref<any>({})
const roles = ref<any[]>([])

const { data, refresh, isLoading } = useLoading(getUserAll, {
  otherParams: formData.value
})

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
        type: 'el-select',
        options: roles.value
      }
    ],
    isAction: false
  }
}))

const computedFormConfig = computed(() => ({
  ...roleConfig,
  columns: [
    ...roleConfig.columns,
    {
      type: 'el-select',
      lable: '角色',
      field: 'rolesId',
      placeholder: '请选择角色',
      options: roles.value
    }
  ]
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

const submit = () => {
  refresh(formData.value)
}
</script>

<style scoped lang="less"></style>
