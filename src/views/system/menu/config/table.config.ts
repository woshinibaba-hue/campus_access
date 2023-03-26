import type { Menu } from '@/api/menu'

export const tableCondig: TableConfig<Menu> = {
  columns: [
    {
      label: '菜单名称',
      prop: 'name'
    },
    {
      label: '菜单图标',
      prop: 'icon',
      type: 'icon',
      align: 'center'
    },
    {
      label: '父级菜单名称',
      prop: 'parent',
      type: 'object',
      field: 'name'
    },
    {
      label: '菜单地址',
      prop: 'url'
    },
    {
      label: '菜单权限',
      prop: 'permission'
    },
    {
      label: '菜单类型',
      prop: 'type'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date'
    },
    {
      label: '操作',
      width: 140,
      isFixed: 'right',
      type: 'action'
    }
  ],
  permissionName: 'menu'
}
