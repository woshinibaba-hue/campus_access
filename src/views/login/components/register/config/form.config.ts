import type { IRegister } from '@/api/login/type'

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validatorEmail = (_: any, val: string, cb: (m?: string) => void) => {
  if (emailReg.test(val)) {
    cb()
  } else {
    cb('邮箱格式非法')
  }
}

export const formConfig: FormConfig<IRegister> = {
  columns: [
    {
      lable: '邮箱',
      field: 'email',
      placeholder: '请输入邮箱'
    },
    {
      lable: '密码',
      field: 'password',
      type: 'password',
      placeholder: '请输入密码'
    },
    {
      lable: '昵称',
      field: 'nickName',
      placeholder: '请输入用户名'
    },
    {
      lable: '个人签名',
      field: 'referral',
      type: 'textarea',
      rows: 3,
      placeholder: '请输入个人签名'
    }
  ],
  labelPosition: 'right',
  actionplace: 'center',
  labelWidth: 70,
  rules: {
    email: [
      { required: true, message: '邮箱不能为空' },
      { validator: validatorEmail, trigger: 'blur' }
    ],
    password: [{ required: true, message: '密码不能为空' }],
    nickName: [{ required: true, message: '昵称不能为空' }]
  },
  submitText: '注册',
  clearText: '重置'
}
