import type { TInform } from '@/api/inform/inform'

export const tableCondfig: TableConfig<TInform> = {
  showHeader: false,
  height: 300,
  isSelect: true,
  isPaging: false,
  isShowIndex: false,
  stripe: false,
  isHeader: false,
  columns: [
    {
      label: '标题',
      prop: 'title'
    },
    {
      label: '发布时间',
      prop: 'createAt',
      type: 'date',
      align: 'right',
      format: 'YYYY年MM月DD日'
    }
  ]
}
