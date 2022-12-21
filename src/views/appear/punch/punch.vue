<template>
  <div class="punch">
    <el-alert
      title="请广大学生，前往指定小程序内进行健康打卡监测，请于每天下午六点前进行健康打卡，祝大家身体健康，望疫情能够早日结束！"
      type="warning"
      show-icon
      :closable="false"
    />
    <el-row class="row" :gutter="15">
      <el-col :span="8">
        <Card title="今日打卡统计">
          <div class="cards">
            <PunchCard title="体温" data="36.8" />
            <PunchCard title="发热" data="是" isUnusual />
            <PunchCard title="核酸" data="否" isUnusual />
            <PunchCard title="外出" data="否" />
          </div>
        </Card>
      </el-col>
      <el-col :span="16">
        <Card title="打卡记录统计"></Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import PunchCard from './components/punchCard/punchCard.vue'
</script>

<style scoped lang="less">
.punch {
  .title {
    margin: 10px 0;
  }

  .row {
    margin-top: 15px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(2, 47%);
    // 不推荐使用
    // grid-column-gap: 20px;
    // grid-row-gap: 20px;
    // 推荐如下
    column-gap: 20px;
    row-gap: 20px;
  }
}
</style>
