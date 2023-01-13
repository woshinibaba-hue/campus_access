<template>
  <div class="login-wrap">
    <Form v-bind="formConfig" v-model="form" @submit="store.login(form)" />
  </div>
</template>

<script setup lang="ts">
import { formConfig } from './config/form.config'

const form = reactive({ email: 'zz@qq.com', password: '123' })

const store = useUser()
</script>

<style scoped lang="less">
.btn {
  width: 100%;
}

.bottom {
  margin-bottom: 30px;
}

.login-wrap {
  :deep(.el-form-item):last-child {
    margin-bottom: 0;
  }
}
</style>
