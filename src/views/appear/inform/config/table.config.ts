export const tableCondfig: TableConfig = {
  showHeader: false,
  height: 300,
  isRadio: true,
  isPaging: true,
  pagination: {
    total: 100
  },
  columns: [
    {
      label: '标题',
      prop: 'title',
      isTooltip: true
    },
    {
      label: '发布时间',
      prop: 'createAt',
      isTooltip: true
    }
  ]
}
