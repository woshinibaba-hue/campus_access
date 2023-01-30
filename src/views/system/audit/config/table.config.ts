import type { TAsking } from '@/api/asking'
import { tableConfig as config } from '@/views/come/asking/config/table.config'

export const tableConfig: TableConfig<TAsking> = {
  ...config,
  columns: [
    ...config.columns,
    {
      label: '审核',
      type: 'audit',
      align: 'center',
      isFixed: 'right',
      width: 180,
      field: 'isAudit'
    }
  ],
  isAdd: false
}
