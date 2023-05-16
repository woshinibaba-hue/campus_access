import type { TAsking } from '@/api/asking'
export const tableConfig: TableConfig<TAsking> = {
  columns: [
    {
      prop: 'user',
      label: '姓名',
      type: 'object',
      field: 'health.name',
      isFixed: 'left'
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
    // {
    //   prop: 'user',
    //   label: '邮箱',
    //   type: 'object',
    //   field: 'email',
    //   width: 150
    // },
    {
      prop: 'address',
      label: '外出地点',
      width: 150
    },
    {
      prop: 'isLeaveCchool',
      label: '是否离校',
      type: 'select',
      align: 'center',
      options: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ]
    },
    {
      prop: 'isAudit',
      label: '审批结果',
      type: 'select',
      align: 'center',
      options: [
        {
          label: '已拒绝',
          value: 2
        },
        {
          label: '已同意',
          value: 1
        },
        {
          label: '待审批',
          value: 0
        }
      ],
      width: 120
    },
    {
      prop: 'isScanCode',
      label: '在校状态',
      type: 'select',
      align: 'center',
      options: [
        {
          label: '已返校',
          value: 2
        },
        {
          label: '离校',
          value: 1
        },
        {
          label: '在校',
          value: 0
        }
      ]
    },
    {
      prop: 'reason',
      label: '请假理由',
      width: 150
    },
    {
      prop: 'startDate',
      label: '请假开始时间',
      width: 180,
      align: 'center',
      isFixed: 'right',
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      prop: 'endDate',
      label: '请假结束时间',
      width: 180,
      isFixed: 'right',
      align: 'center',
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  ],
  addText: '请假',
  isFixedIndex: true,
  permissionName: 'asking'
}
