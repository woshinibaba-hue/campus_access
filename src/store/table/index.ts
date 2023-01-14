export const useTable = defineStore('table', () => {
  const columnList = ref<TableColum[]>([])
  const checkAll = ref(true)
  const isIndeterminate = ref(false)
  const tableCol = ref<TableColum[]>([])
  const checkList = ref<string[]>([])

  const init = (columns: TableColum[]) => {
    columnList.value = columns
    tableCol.value = columns.map(v => ({
      ...v,
      isShow: true
    }))
    tableCol.value.forEach(v => checkList.value.push(v.label))
  }

  const updateTableCol = (col: TableColum) => {
    tableCol.value.forEach(t => {
      if (t.field === col.field && t.prop === col.prop) {
        t.isShow = !t.isShow
      }
    })

    const cl = checkList.value.length
    checkAll.value = cl === columnList.value.length
    isIndeterminate.value = cl !== 0 && cl < columnList.value.length
  }

  const handleCheckChange = (check: boolean, isReset = false) => {
    checkList.value = []

    if (check) {
      tableCol.value = columnList.value.map(v => ({
        ...v,
        isShow: true
      }))
      tableCol.value.forEach(v => checkList.value.push(v.label))
      isReset && (checkAll.value = true)
    } else {
      tableCol.value.forEach(t => (t.isShow = false))
    }

    isIndeterminate.value = false
  }

  return {
    checkAll,
    isIndeterminate,
    tableCol,
    checkList,
    columnList,
    init,
    updateTableCol,
    handleCheckChange
  }
})
