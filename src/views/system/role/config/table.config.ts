import type { TRole } from '@/api/role'

export const tableConfig: TableConfig<TRole> = {
  columns: [
    {
      label: '角色名称',
      prop: 'name'
    },
    {
      label: '角色介绍',
      prop: 'intro'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      type: 'date'
    },
    {
      label: '操作',
      type: 'action',
      isFixed: 'right'
    }
  ],
  permissionName: 'role'
}
