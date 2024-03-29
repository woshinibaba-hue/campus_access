import type { TInform } from '@/api/inform/inform'

export const tableConfig: TableConfig<TInform> = {
  height: 358,
  columns: [
    {
      prop: 'title',
      label: '标题',
      width: 140
    },
    {
      prop: 'content',
      label: '通知内容',
      width: 350
    },
    {
      prop: 'createAt',
      label: '发布时间',
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:DD'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:DD'
    },
    {
      type: 'action',
      label: '操作',
      width: 150,
      align: 'center',
      isFixed: 'right'
    }
  ],
  permissionName: 'issue'
}
