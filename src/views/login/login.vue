<template>
  <div class="login">
    <img src="../../assets/images/login.svg" class="bg" alt="" />
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="账号密码登录" name="account">
        <Login />
      </el-tab-pane>
      <el-tab-pane label="账号注册" name="register">
        <Register ref="RegisterRef" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import Login from './components/login/login.vue'
import Register from './components/register/register.vue'

const activeName = ref('account')
useDark()

const RegisterRef = ref<InstanceType<typeof Register>>()

watch(activeName, (newName: string) => {
  if (newName === 'account') {
    RegisterRef.value?.formRef?.clear()
  }
})
</script>

<style scoped lang="less">
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 20px;
  border-radius: 6px;
  background-color: var(--el-bg-color-overlay);

  .bg {
    position: absolute;
    top: -87px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
