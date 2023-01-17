import type { Menu } from '@/api/menu'

export const dialogConfig: DialogType<Menu> = {
  form: {
    columns: [
      {
        lable: '菜单名称',
        field: 'name',
        placeholder: '请输入菜单权限'
      },
      {
        lable: '菜单图标',
        field: 'icon',
        placeholder: '请输入菜单图标'
      },
      {
        lable: '父级菜单',
        field: 'parentId',
        placeholder: '请输入菜单图标'
      },
      {
        lable: '菜单权限',
        field: 'permission',
        placeholder: '请输入菜单权限'
      },
      {
        lable: '菜单路径',
        field: 'url',
        placeholder: '请输入菜单图标'
      }
    ],
    isAction: false,
    labelPosition: 'right',
    labelWidth: 100,
    rules: {
      name: [{ required: true, message: '菜单名称不能为空' }]
    }
  },
  title: '菜单'
}
