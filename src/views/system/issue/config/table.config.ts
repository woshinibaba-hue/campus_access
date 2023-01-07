import type { TInform } from '@/api/inform'

export const tableConfig: TableConfig<TInform> = {
  height: 358,
  columns: [
    {
      prop: 'title',
      label: '标题'
    },
    {
      prop: 'content',
      label: '通知内容'
    },
    {
      prop: 'createAt',
      label: '发布时间',
      slotName: 'date',
      format: 'YYYY-MM-DD HH:mm:DD'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      slotName: 'date',
      format: 'YYYY-MM-DD HH:mm:DD'
    },
    {
      slotName: 'action',
      label: '操作',
      width: 160
    }
  ]
}
