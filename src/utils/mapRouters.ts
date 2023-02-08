import type { Menu } from '@/api/menu'

class MapRouter {
  transformTreeData(menu: Menu[], field: keyof Menu = 'id') {
    const treeData: Menu[] = []

    for (const m of menu ?? []) {
      if (!m.parentId) {
        treeData.push(m)
      } else {
        // const patent = menu.find((v: any) => v[field] === r.parentId)
        // !patent?.children ? (patent!.children = [r]) : patent?.children?.push(r)

        const p = menu.find(pm => pm[field] === m.parentId)
        if (!p) return
        if (!p.children?.length) p.children = []
        p.children.push(m)
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
