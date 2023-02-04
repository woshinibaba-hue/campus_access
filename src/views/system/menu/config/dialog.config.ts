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
        lable: '菜单权限',
        field: 'permission',
        type: 'el-select',
        placeholder: '请选择菜单权限',
        options: [
          {
            label: '新增',
            value: 'add'
          },
          {
            label: '编辑',
            value: 'edit'
          },
          {
            label: '删除',
            value: 'delete'
          },
          {
            label: '查询',
            value: 'query'
          }
        ]
      },
      {
        lable: '菜单路径',
        field: 'url',
        placeholder: '请输入菜单路径'
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
