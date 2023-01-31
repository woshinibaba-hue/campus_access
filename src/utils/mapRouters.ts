import type { Menu } from '@/api/menu'

class MapRouter {
  transformTreeData(menu: Menu[], field = 'id') {
    const treeData: Menu[] = []

    for (const r of menu ?? []) {
      if (!r.parentId) {
        treeData.push(r)
      } else {
        const patent = menu.find((v: any) => v[field] === r.parentId)
        !patent?.children ? (patent!.children = [r]) : patent?.children?.push(r)
      }
    }

    return treeData
  }

  checkTreeKeys(menu: Menu[], field = 'id') {
    const keys: number[] = []

    const _checkTreeKeys = (m: Menu[]) => {
      m.forEach((v: any) => {
        if (!v.children) {
          keys.push(v[field])
        } else {
          _checkTreeKeys(v.children)
        }
      })
    }

    _checkTreeKeys(menu)

    return keys
  }
}

export default new MapRouter()
