<template>
  <div class="info">
    <Form v-bind="formProps" />
  </div>
</template>

<script setup lang="ts">
import { TFormProps } from '@/components/Form/types'

const formProps: TFormProps = {
  fromItems: [
    {
      field: 'name',
      lable: '学生姓名',
      type: 'input',
      placeholder: '请输入学生姓名'
    }
  ]
}
</script>

<style lang="less" scoped></style>
