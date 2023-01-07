import type { TInform } from '@/api/inform'

export const formConfig: FormConfig<TInform> = {
  columns: [
    {
      field: 'title',
      lable: '标题',
      type: 'input',
      placeholder: '请输入标题'
    },
    {
      field: 'content',
      lable: '内容',
      type: 'textarea',
      placeholder: '请输入内容',
      rows: 14
    }
  ],
  rules: {
    title: [{ required: true, message: '标题不能为空' }],
    content: [{ required: true, message: '内容不能为空' }]
  },
  actionplace: 'start'
}
