<template>
  <Card class="footer">
    <p>
      Copyright © 2023
      <el-link
        href="https://www.yimiciji.top:7777"
        target="_blank"
        type="primary"
      >
        一名菜鸡
      </el-link>
    </p>
    <p>
      <el-link
        href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
        target="_blank"
        type="primary"
      >
        网站已备案：鄂ICP备2022013787号
      </el-link>
    </p>
    <p>版权归属：武汉工程科技学院 信息工程学院 19移动本11 2330191110-张健</p>
  </Card>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  text-align: center;
  font-size: 14px;
  margin: 16px;
}
</style>
