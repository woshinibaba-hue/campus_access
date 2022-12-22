export const tableCondfig: TableConfig = {
  showHeader: false,
  height: 300,
  isSelect: true,
  isPaging: false,
  columns: [
    {
      label: '标题',
      prop: 'title'
    },
    {
      label: '发布时间',
      prop: 'createAt',
      slotName: 'date',
      align: 'right',
      format: 'YYYY年MM月DD日'
    }
  ]
}
