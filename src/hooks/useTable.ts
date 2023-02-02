/**
 * Table 组件逻辑封装
 */

import type { Ref } from 'vue'

export function useTableUtil({
  refresh,
  dialogVisible,
  editFn,
  addFn,
  deleteFn,
  deleteFields,
  options
}: {
  refresh?: () => any
  dialogVisible: Ref<boolean>
  deleteFn?: (...args: any[]) => any
  editFn?: (...args: any[]) => any
  addFn?: (...args: any[]) => any
  deleteFields?: string[]
  options?: Record<string, any>
}) {
  const confirm = async (formData: any) => {
    if (!formData.id) await addFn?.(formData)
    else await editFn?.(formData)
    ElNotification({
      message: '成功',
      type: 'success'
    })
    refresh?.()
    dialogVisible.value = false
  }

  const handleDelete = async (data: any) => {
    await deleteFn?.(data.id)
    ElNotification({
      message: '删除成功',
      type: 'success'
    })
    refresh?.()
  }

  const editItem = ref<Record<string, any>>({})
  const handleEdit = (data: Record<string, any>) => {
    deleteFields?.forEach(k => {
      Reflect.deleteProperty(data, k)
    })
    editItem.value = data
    dialogVisible.value = true
  }

  return {
    confirm,
    handleDelete,
    handleEdit,
    editItem
  }
}
