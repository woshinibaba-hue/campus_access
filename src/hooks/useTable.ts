/**
 * Table 组件逻辑封装
 */

import { Ref } from 'vue'

export function useTable({
  refresh,
  dialogVisible,
  editFn,
  addFn,
  deleteFn
}: {
  refresh?: () => any
  dialogVisible: Ref<boolean>
  deleteFn?: (...args: any[]) => any
  editFn?: (...args: any[]) => any
  addFn?: (...args: any[]) => any
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

  return {
    confirm,
    handleDelete
  }
}
