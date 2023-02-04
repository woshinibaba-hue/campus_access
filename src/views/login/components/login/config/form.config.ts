import type { IUser } from '@/api/login/type'
export const formConfig: FormConfig<OmitBase<IUser>> = {
  columns: [
    {
      field: 'email',
      lable: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      lable: '密码',
      placeholder: '请输入密码'
    }
  ],
  rules: {
    email: [{ required: true, message: '邮箱不能为空~' }],
    password: [{ required: true, message: '密码不能为空~' }]
  },
  submitText: '登录',
  labelPosition: 'top'
}
