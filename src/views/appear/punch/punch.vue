<template>
  <div class="punch">
    <el-alert
      title="请广大学生，前往指定小程序内进行健康打卡监测，请于每天下午六点前进行健康打卡，祝大家身体健康，望疫情能够早日结束！"
      type="warning"
      show-icon
      :closable="false"
    />
    <el-row class="row" :gutter="15">
      <el-col :span="8" v-if="dayData?.id">
        <Card title="今日打卡统计">
          <div class="cards">
            <PunchCard
              title="体温"
              :data="dayData?.heat"
              :isUnusual="+dayData?.heat > 37.2"
            />
            <PunchCard
              title="发热"
              :data="+dayData?.isFeve ? '是' : '否'"
              :isUnusual="!!+dayData?.isFeve"
            />
            <PunchCard
              title="核酸"
              :data="+dayData?.isNowAcid ? '是' : '否'"
              :isUnusual="!+dayData?.isNowAcid"
            />
            <PunchCard
              title="外出"
              :data="+dayData?.isOut ? '是' : '否'"
              :isUnusual="!!+dayData?.isOut"
            />
          </div>
        </Card>
      </el-col>
      <el-col :span="8" v-else>
        <Card title="请前往小程序内进行打卡">
          <p>
            请打卡小程序打卡功能，填完信息之后进行扫描下方二维码即可打卡成功
          </p>
          <img :src="url" alt="" class="code" />
        </Card>
      </el-col>
      <el-col :span="16">
        <Card title="您的全部打卡记录" :loading="isLoading">
          <Table
            v-bind="tableConfigComputed"
            :data="data?.data ?? []"
            :total="data?.total"
            @currentChange="currentChange"
            @refresh="refresh"
          />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import PunchCard from './components/punchCard/punchCard.vue'

import { useLoading } from '@/hooks'
import {
  getUserToDayPunch,
  getUserPunchAll,
  IPunch,
  getCode
} from '@/api/punch'

import { tableConfig } from './config/table.config'

const url = ref<string>()

const { data, isLoading, refresh, pages } =
  useLoading<IPaging<IPunch[]>>(getUserPunchAll)

const { data: dayData } = useLoading(getUserToDayPunch, {
  after(res) {
    if (!res.id) {
      getCode().then(res => {
        url.value = res.data
      })
    }
  }
})

const tableConfigComputed = computed(() => ({
  ...tableConfig,
  pagination: { ...tableConfig.pagination, total: data.value?.total, ...pages }
}))

const currentChange = (page: number) => {
  pages.page = page
}
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

  .code {
    width: 100%;
  }
}
</style>
