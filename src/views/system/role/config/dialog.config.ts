import type { TRole } from '@/api/role'

export const dialogConfig: DialogType<TRole> = {
  title: '角色',
  form: {
    columns: [
      {
        lable: '角色名称',
        field: 'name',
        placeholder: '请输入角色名称'
      },
      {
        lable: '角色简介',
        field: 'intro',
        placeholder: '请输入角色简介'
      }
    ],
    rules: {
      name: [{ required: true, message: '角色名称不能为空' }],
      intro: [{ required: true, message: '角色简介不能为空' }]
    },
    isAction: false
  }
}
