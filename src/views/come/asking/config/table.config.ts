import type { TAsking } from '@/api/asking'
export const tableConfig: TableConfig<TAsking> = {
  columns: [
    {
      prop: 'user',
      label: '姓名',
      type: 'object',
      field: 'health.name'
    },
    {
      prop: 'user',
      label: '学院',
      type: 'object',
      field: 'health.college',
      width: 120
    },
    {
      prop: 'user',
      label: '班级',
      type: 'object',
      field: 'health.class',
      width: 120
    },
    {
      prop: 'user',
      label: '邮箱',
      type: 'object',
      field: 'email',
      width: 150
    },
    {
      prop: 'address',
      label: '外出地点',
      width: 150
    },
    {
      prop: 'isLeaveCchool',
      label: '是否离校'
    },
    {
      prop: 'isAudit',
      label: '是否审批'
    },
    {
      prop: 'isScanCode',
      label: '请假状态'
    },
    {
      prop: 'reason',
      label: '请假理由',
      width: 150
    },
    {
      prop: 'startDate',
      label: '请假开始时间',
      width: 150,
      isFixed: 'right'
    },
    {
      prop: 'endDate',
      label: '请假结束时间',
      width: 150,
      isFixed: 'right'
    }
  ],
  addText: '请假'
}
