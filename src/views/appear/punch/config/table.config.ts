import type { IPunch } from '@/api/punch'

export const tableConfig: TableConfig<IPunch> = {
  isAdd: false,
  isShowIndex: false,
  columns: [
    {
      label: 'id',
      prop: 'id'
    },
    {
      label: '昵称',
      prop: 'user',
      type: 'object',
      field: 'nickName'
    },
    {
      label: '体温 (℃)',
      prop: 'heat',
      width: 140
    },
    {
      label: '是否发热',
      prop: 'isFeve'
    },
    {
      label: '七日内是否外出',
      prop: 'isOut',
      width: 160
    },
    {
      label: '今日是否采集核酸',
      prop: 'isNowAcid',
      width: 160
    },
    {
      label: '打卡地点',
      prop: 'address',
      width: 200
    },
    {
      label: '经度',
      prop: 'longitude',
      width: 160
    },
    {
      label: '纬度',
      prop: 'latitude',
      width: 160
    },
    {
      label: '其它症状',
      prop: 'other',
      width: 160
    },
    {
      label: '打卡时间',
      width: 120,
      prop: 'createAt',
      type: 'date',
      isFixed: 'right'
    }
  ]
}
