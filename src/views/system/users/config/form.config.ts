import type { IUser } from '@/api/login/type'

export const roleConfig: FormConfig<IUser> = {
  columns: [
    {
      lable: '昵称',
      field: 'nickName',
      placeholder: '请输入昵称'
    }
  ],
  actionplace: 'end',
  submitText: '查询'
}
