# Vite + Vue3 + TypeScript + Pinia

该模板集成了 Vue3 常用的一些配置项

**安装依赖**

``` bash
pnpm i
```

**启动项目**

``` bash
pnpm run dev
```

## eslint + Prettier

该项目采用 eslint 统一代码格式，使用 prettier 进行统一代码格式化，使得其符合一定的规范

``` json
// .prettierrc
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false,
  "endOfLine": "lf"
}
```

``` json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "vue-eslint-parser",
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["vue", "@typescript-eslint"],
  "rules": {
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/no-non-null-assertion": 0
  }
}

```



## axios

网络请求采用 axios ，并且也对 axios 一些常用配置项进行二次封装

``` javascript
import axios, { AxiosError, AxiosInstance } from 'axios'

import { IRequestConfig, IDataResult } from './type'

class Request {
  private instance: AxiosInstance

  constructor(requestConfig: IRequestConfig) {
    this.instance = axios.create(requestConfig)

    // 给每个单独的请求配置添加拦截器
    this.instance.interceptors.request.use(
      requestConfig.interceptors?.requestInstance,
      requestConfig.interceptors?.requestInstanceCatch
    )

    this.instance.interceptors.response.use(
      requestConfig.interceptors?.responseInstance,
      requestConfig.interceptors?.responseInstanceCatch
    )

    // 给所有的axios实例添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 如果有token，则添加到请求头
        const token = '111'
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (err: AxiosError<IDataResult>) => {
        if (err.response?.data.message) {
          ElMessage.error(err.response.data.message)
        }
        return Promise.reject(err)
      }
    )
  }

  // 请求方法
  private request<T = unknown>(requestConfig: IRequestConfig) {
    return new Promise<IDataResult<T>>((resolve, reject) => {
      this.instance
        .request<unknown, IDataResult<T>>(requestConfig)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = unknown>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T = unknown>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'post' })
  }

  put<T = unknown>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'put' })
  }

  delete<T = unknown>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'delete' })
  }
}

export default Request
```

``` typescript
// 类型声明
import { AxiosRequestConfig } from 'axios'

interface IRequestInterceptors {
  // 请求拦截器
  requestInstance?: (request: AxiosRequestConfig) => AxiosRequestConfig
  // 请求失败拦截器
  requestInstanceCatch?: (error: unknown) => unknown
  // 响应拦截器
  responseInstance?: (response: AxiosRequestConfig) => AxiosRequestConfig
  // 响应失败拦截器
  responseInstanceCatch?: (error: unknown) => unknown
}

// 扩展请求配置，使得传入更多的属性
interface IRequestConfig extends AxiosRequestConfig {
  interceptors?: IRequestInterceptors
}

// 服务器返回的数据类型
interface IDataResult<T = unknown> {
  code: number
  data: T
  message?: string
}

export type { IRequestConfig, IDataResult }
```



## Pinia

状态管理采用 pinia，它比 vue4x 更好的支持 TS 类型检查

``` typescript
export const useCount = defineStore('count', () => {
  const count = ref(0)

  const increment = () => count.value++

  const decrement = () => count.value--

  return {
    count,
    increment,
    decrement
  }
})
```

## Element-plus

UI 组件使用 Element-plus，也对此进行了按需导入



## 自动导入

使用 unplugin-vue-components 来将 element-plus 和 自定义组件 进行按需自动导入

使用 unplugin-auto-import 来将一些 api 进行自动导入，本模板只配置了 vue、axios、pinia的自动导入

具体配置如下

``` typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: ElementPlusResolver()
    }),
    Components({
      resolvers: ElementPlusResolver()
    })
  ]
})

```

