import type { TNucleate } from '@/api/nucleates'

export const tableCondfig: TableConfig<TNucleate> = {
  isHeader: false,
  columns: [
    {
      prop: 'user',
      label: '用户昵称',
      field: 'nickName',
      type: 'object',
      width: 80
    },
    {
      prop: 'user',
      label: '个性签名',
      field: 'referral',
      type: 'object',
      width: 150
    },
    {
      prop: 'url',
      label: '核酸截图',
      type: 'url',
      width: 500
    },
    {
      prop: 'createAt',
      label: '上传时间',
      type: 'date',
      format: 'YYYY-MM-DD HH:mm',
      width: 150,
      isFixed: 'right'
    }
  ]
}
