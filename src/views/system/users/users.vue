<template>
  <div class="users">
    <Card title="用户管理">
      <Table
        :data="data?.data"
        v-bind="tableConfigComputed"
        @delete="deleteUser"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { IUser } from '@/api/login/type'
import { tableConfig } from './config/table.config'

const { data, refresh } = useLoading(getUserAll)

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  pagination: {
    total: data.value?.total
  }
}))

const deleteUser = async (user: IUser) => {
  await deleteUserById(user.id)
  refresh()
  ElNotification({
    type: 'success',
    message: '删除成功'
  })
}
</script>

<style scoped lang="less"></style>
