<template>
  <el-upload
    :action="url"
    :headers="headers"
    drag
    name="img"
    :on-success="success"
    :on-error="error"
    :before-upload="beforeUpload"
    class="avatar-uploader"
    :show-file-list="false"
  >
    <el-icon class="el-icon--upload">
      <IconEpUploadFilled />
    </el-icon>
    <div class="el-upload__text">在此处拖动文件或<em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">格式为jpg/png/jpeg, 文件大小在1.5M以内</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'
import type { IUser } from '@/api/login/type'
import storage from '@/utils/storage'

const headers = ref<Record<string, any>>({})
const token = storage.get<IUser>('user')?.token
headers.value.Authorization = `Bearer ${token}`

withDefaults(
  defineProps<{
    url?: string
  }>(),
  {
    url: '/api/upload/img'
  }
)

const beforeUpload = (rawFile: UploadRawFile) => {
  const imgReg = /(png|jpg|jpeg)/
  if (!imgReg.test(rawFile.type)) {
    ElNotification({
      message: '格式为jpg/png/jpeg',
      type: 'error'
    })
    return false
  }

  if (rawFile.size / 1024 > 1.5 * 1024) {
    ElNotification({
      message: '文件大小必须在1.5M以内',
      type: 'error'
    })
    return false
  }
}

const success = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(response)
  ElNotification({
    message: response.message,
    type: 'success'
  })
}

const error = (error: Error) => {
  ElNotification({
    message: JSON.parse(error.message).message,
    type: 'error'
  })
}
</script>

<style scoped lang="less"></style>
