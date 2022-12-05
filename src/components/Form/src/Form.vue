<template>
  <el-form :label-width="labelWidth">
    <el-form-item
      v-for="item in fromItems"
      :key="item.field"
      :label="item.lable"
    >
      <template v-if="item.type === 'input' || item.type === 'password'">
        <el-input :placeholder="item.placeholder" show-password />
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormRules } from 'element-plus'
import { TFromItem } from '../types'

type TFormProps = {
  fromItems: TFromItem[]
  rules?: FormRules
  labelWidth?: string
}

withDefaults(defineProps<TFormProps>(), {
  labelWidth: '120px'
})
</script>

<style lang="less" scoped></style>
