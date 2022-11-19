<template>
  <div class="login-wrap">
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item class="bottom" prop="email">
        <el-input
          :prefix-icon="User"
          size="large"
          clearable
          placeholder="请输入邮箱"
          v-model="form.email"
        />
      </el-form-item>
      <el-form-item class="bottom" prop="password">
        <el-input
          :prefix-icon="Lock"
          size="large"
          type="password"
          show-password
          clearable
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="success" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElForm, FormRules } from 'element-plus/es'

import { useUser } from '@/store'

const form = reactive({ email: 'root@qq.com', password: '123' })

const rules = reactive<FormRules>({
  email: [{ required: true, message: '邮箱不能为空~' }],
  password: [{ required: true, message: '密码不能为空~' }]
})

const formRef = ref<InstanceType<typeof ElForm>>()
const store = useUser()

const login = () => {
  formRef.value?.validate(async (isValid) => {
    if (isValid) {
      store.login(form)
    }
  })
}
</script>

<style scoped lang="less">
.btn {
  width: 100%;
}

.bottom {
  margin-bottom: 30px;
}
</style>
