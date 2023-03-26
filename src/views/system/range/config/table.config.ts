export const tableConfig: TableConfig<{ latitude: number; longitude: number }> =
  {
    isHeader: false,
    isPaging: false,
    height: 347,
    isShowIndex: false,
    columns: [
      {
        label: '经度',
        prop: 'longitude',
        align: 'center'
      },
      {
        label: '纬度',
        prop: 'latitude',
        align: 'center'
      }
    ],
    permissionName: 'range'
  }
