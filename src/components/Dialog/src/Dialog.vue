<template>
  <div class="dialog">
    <el-dialog v-model="visible" :title="title" :width="width" @close="close">
      <slot name="content">
        <template v-if="form">
          <Form v-bind="form" v-model="data" ref="formRef" />
        </template>
      </slot>
      <template v-if="isFooter" #footer>
        <span class="dialog-footer">
          <el-button @click="close">
            {{ closeText }}
          </el-button>
          <el-button type="primary" @click="$emit('confirm')">
            {{ submitText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Form from '@/components/Form'

type Props = {
  closeText?: string
  submitText?: string
  modelValue: boolean
  title?: string
  width?: string
  isFooter?: boolean
  form?: FormConfig
  formData?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  closeText: '关闭',
  submitText: '确认',
  title: '我是默认标题',
  width: '50%',
  isFooter: true
})

const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

const formRef = ref<InstanceType<typeof Form>>()

const visible = ref()
const data = ref()

const close = () => {
  formRef.value?.clear()
  emits('update:modelValue', false)
}

watchEffect(() => {
  visible.value = props.modelValue
  data.value = props.formData
})
</script>

<style scoped></style>
