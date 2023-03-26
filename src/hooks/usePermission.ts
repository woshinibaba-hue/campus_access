import { useMenu } from '@/store/menu'

export function usePermission(name: string, permission: string) {
  const { permissionList } = storeToRefs(useMenu())

  console.log(permissionList.value)

  return permissionList.value.includes(`${name}-${permission}`)
}
