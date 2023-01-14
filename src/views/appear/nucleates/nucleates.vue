<template>
  <div class="nucleates">
    <el-row :gutter="20">
      <el-col :span="8">
        <Card title="请上传当日核酸截图">
          <el-upload
            action="/api/nucleate"
            :headers="headers"
            drag
            name="img"
            :on-success="success"
            :on-error="error"
            :before-upload="beforeUpload"
          >
            <el-icon class="el-icon--upload">
              <IconEpUploadFilled />
            </el-icon>
            <div class="el-upload__text">在此处拖动文件或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">
                核酸截图格式为jpg/png/jpeg, 文件大小在1.5M以内
              </div>
            </template>
          </el-upload>
        </Card>
      </el-col>
      <el-col :span="16">
        <Card title="您的核酸记录" :loading="isLoading">
          <Table v-bind="tableCondfig" :data="data?.data" />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'
import type { IUser } from '@/api/login/type'
import storage from '@/utils/storage'
import { tableCondfig } from './config/table.config'

const headers = ref<Record<string, any>>({})
const token = storage.get<IUser>('user')?.token
headers.value.Authorization = `Bearer ${token}`

const beforeUpload = (rawFile: UploadRawFile) => {
  const imgReg = /(png|jpg|jpeg)/
  if (!imgReg.test(rawFile.type)) {
    ElNotification({
      message: '截图格式为jpg/png/jpeg',
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
) => {}

const error = (error: Error) => {
  ElNotification({
    message: JSON.parse(error.message).message,
    type: 'error'
  })
}

const { data, isLoading, pages } = useLoading(getUserNucleate)
</script>

<style scoped lang="less"></style>
