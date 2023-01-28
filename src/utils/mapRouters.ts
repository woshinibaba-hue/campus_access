import type { Menu } from '@/api/menu'

class MapRouter {
  transformTreeData(menu: Menu[]) {
    const treeData: Menu[] = []

    for (const r of menu) {
      if (!r.parentId) {
        treeData.push(r)
      } else {
        const patent = menu.find(v => v.id === r.parentId)
        !patent?.children ? (patent!.children = [r]) : patent?.children?.push(r)
      }
    }

    return treeData
  }
}

export default new MapRouter()
