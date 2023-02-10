import type { Menu } from '@/api/menu'

class MapRouter {
  // transformTreeData(menu: Menu[], field: keyof Menu = 'id') {
  //   const treeData: Menu[] = []

  //   for (const m of menu ?? []) {
  //     if (!m.parentId) {
  //       treeData.push(m)
  //     } else {
  //       // const patent = menu.find((v: any) => v[field] === r.parentId)
  //       // !patent?.children ? (patent!.children = [r]) : patent?.children?.push(r)

  //       const p = menu.find(pm => pm[field] === m.parentId)
  //       if (!p) return
  //       if (!p.children?.length) p.children = []
  //       p.children.push(m)
  //     }
  //   }

  //   return treeData
  // }

  transformTreeData(menu: Menu[], field: keyof Menu = 'id') {
    const treeData: Menu[] = []
    const parentMap: Map<number, Menu[]> = new Map()

    for (const m of menu ?? []) {
      if (!m.parentId) {
        // 根节点
        treeData.push(m)
      } else {
        // 去Map中查找父节点，如果没有则创建一个空数组
        const parentChildren = parentMap.get(m.parentId!) ?? []
        // 将当前节点放入父节点的children中
        parentChildren.push(m)
        // 将父节点存入Map中
        parentMap.set(m.parentId!, parentChildren)
      }
    }

    // 遍历Map对象，获取父节点id和子节点
    for (const [parentId, children] of parentMap) {
      // 根据Map对象中的父节点id，从menu中找到对应的父节点
      const parent = menu.find(pm => pm[field] === parentId)
      if (parent) {
        // 将子节点赋值给父节点的children
        parent.children = children
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

  async filterRouter(menu: Menu[], field = 'id') {
    const routers = import.meta.glob('@/router/routers/*.ts')
    const routerAll: any[] = []
    const routerList: any[] = []

    for (const r in routers) {
      const res: any = await routers[r]()
      routerAll.push(res.default)
    }

    menu.forEach(r => {
      if (r.url) {
        const router = routerAll.find(v => v.path === r.url)
        router && routerList.push(router)
      }
    })

    return routerList
  }
}

export default new MapRouter()
