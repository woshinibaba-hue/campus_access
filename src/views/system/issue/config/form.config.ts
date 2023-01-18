import type { TInform } from '@/api/inform/inform'

const titleVal: TRuleFun = (_, value, cb) => {
  if (value.length > 20) {
    cb('标题长度不能超过20')
  } else {
    cb()
  }
}

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
      rows: 10
    }
  ],
  rules: {
    title: [
      { required: true, message: '标题不能为空' },
      { validator: titleVal, trigger: 'blur' }
    ],
    content: [{ required: true, message: '内容不能为空' }]
  },
  actionplace: 'start',
  isAction: false,
  labelWidth: '60'
}
