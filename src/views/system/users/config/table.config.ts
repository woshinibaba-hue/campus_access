import type { IUserAndHealth } from '@/api/login/type'

export const tableConfig: TableConfig<IUserAndHealth> = {
  columns: [
    {
      label: '昵称',
      prop: 'nickName'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: 130
    },
    {
      label: '头像',
      prop: 'avatar',
      type: 'image',
      width: 150
    },
    {
      label: '真实姓名',
      prop: 'health',
      type: 'object',
      field: 'name',
      width: 100
    },
    {
      label: '学院',
      prop: 'health',
      type: 'object',
      field: 'college',
      width: 120
    },
    {
      label: '班级',
      prop: 'health',
      type: 'object',
      field: 'class',
      width: 120
    },
    {
      label: '学号',
      prop: 'health',
      type: 'object',
      field: 'studentNo',
      width: 120
    },
    {
      label: '学历',
      prop: 'health',
      type: 'object',
      field: 'education'
    },
    {
      label: '身份证号',
      prop: 'health',
      type: 'object',
      field: 'identity'
    },
    {
      label: '宿舍楼',
      prop: 'health',
      type: 'object',
      field: 'dormitory'
    },
    {
      label: '宿舍号',
      prop: 'health',
      type: 'object',
      field: 'dormitoryNo'
    },
    {
      label: '手机号',
      prop: 'health',
      type: 'object',
      field: 'phone',
      width: 120
    },
    {
      label: '性别',
      prop: 'health',
      type: 'object',
      field: 'sex'
    },
    {
      label: '户籍所在地',
      prop: 'health',
      type: 'object',
      field: 'koseki',
      width: 150
    },
    {
      label: '籍贯',
      prop: 'health',
      type: 'object',
      field: 'native'
    },
    {
      label: '第一针疫苗厂家',
      prop: 'health',
      type: 'object',
      field: 'oneVaccine',
      width: 140
    },
    {
      label: '第一针疫苗接种时间',
      prop: 'health',
      type: 'object',
      field: 'oneVaccineTime',
      width: 150
    },
    {
      label: '第二针疫苗厂家',
      prop: 'health',
      type: 'object',
      field: 'twoVaccine',
      width: 140
    },
    {
      label: '第二针疫苗接种时间',
      prop: 'health',
      type: 'object',
      field: 'twoVaccineTime',
      width: 150
    },
    {
      label: '第三针疫苗厂家',
      prop: 'health',
      type: 'object',
      field: 'threeVaccine',
      width: 140
    },
    {
      label: '第三针疫苗接种时间',
      prop: 'health',
      type: 'object',
      field: 'threeVaccineTime',
      width: 150
    },
    {
      label: '注册时间',
      prop: 'createAt',
      type: 'date',
      isFixed: 'right',
      width: 130
    },
    {
      label: '操作',
      type: 'action',
      isFixed: 'right',
      width: 130
    }
  ],
  pagination: {}
}
