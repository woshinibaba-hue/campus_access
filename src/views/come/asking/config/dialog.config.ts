import type { TAsking } from '@/api/asking'

export const dialogConfig: DialogType<TAsking> = {
  form: {
    columns: [
      {
        field: 'address',
        lable: '外出地址'
      },
      {
        field: 'isLeaveCchool',
        lable: '是否离校',
        type: 'select',
        options: [
          {
            value: 1,
            label: '是'
          },
          {
            value: 0,
            label: '否'
          }
        ]
      },
      {
        field: 'startDate',
        lable: '请假开始时间'
      },
      {
        field: 'endDate',
        lable: '请假结束时间'
      },
      {
        field: 'reason',
        lable: '请假理由',
        type: 'textarea'
      }
    ],
    isAction: false,
    labelPosition: 'right',
    labelWidth: 120,
    rules: {
      address: [{ required: true, message: '外出地址不能为空！' }],
      isLeaveCchool: [{ required: true, message: '是否离校不能为空！' }],
      startDate: [{ required: true, message: '请假开始时间不能为空！' }],
      endDate: [{ required: true, message: '请假结束时间不能为空！' }],
      reason: [{ required: true, message: '请假理由不能为空！' }]
    }
  },
  title: '请假'
}
