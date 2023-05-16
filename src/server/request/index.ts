import axios, { AxiosError, AxiosInstance } from 'axios'

import storage from '@/utils/storage'
import NProgress from 'nprogress'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' //指定进度条的父容器
})

import { IDataResult, IRequestConfig } from './type'

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
      config => {
        // 如果有token，则添加到请求头
        const user = storage.get<any>('user')

        if (user?.token) {
          config.headers!.Authorization = `Bearer ${user.token}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      response => {
        if (response.data) {
          return response.data
        }
        ElNotification({
          message: '服务器异常',
          type: 'error'
        })
      },
      async (err: AxiosError<IDataResult>) => {
        if (err.response?.status === 401) {
          // 利用refresh_token获取新的token
          const user = storage.get<any>('user')
          if (user?.refresh_token) {
            try {
              const res = await this.post<any>({
                url: '/user/refreshToken',
                data: {
                  refresh_token: user.refresh_token
                }
              })
              // 获取到新的token后，重新发起请求
              user.token = res.data.token
              user.refresh_token = res.data.refresh_token
              storage.set('user', user)
              useUser().user = user
              return await this.request(err.config)
            } catch (e) {
              useUser().logout()
            }
          } else {
            useUser().logout()
          }

          return
        }
        if (Array.isArray(err.response?.data.message)) {
          if (err.response?.data.message.length) {
            ElNotification({
              message: err.response?.data.message[0],
              type: 'error'
            })
          } else {
            ElNotification({
              message: err.response?.data.message,
              type: 'error'
            })
          }
        } else {
          ElNotification({
            message: err.response?.data.message,
            type: 'error'
          })
        }
        return Promise.reject(err)
      }
    )
  }

  // 请求方法
  private request<T = unknown>(
    requestConfig: IRequestConfig,
    isShowLoading = true
  ) {
    if (isShowLoading)
      // 开启loading
      NProgress.start()
    return new Promise<IDataResult<T>>((resolve, reject) => {
      this.instance
        .request<unknown, IDataResult<T>>(requestConfig)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          if (isShowLoading)
            // 关闭loading
            NProgress.done()
        })
    })
  }

  get<T = unknown>(config: IRequestConfig, isShowLoading = true) {
    return this.request<T>({ ...config, method: 'get' }, isShowLoading)
  }

  post<T = unknown>(config: IRequestConfig, isShowLoading = true) {
    return this.request<T>({ ...config, method: 'post' }, isShowLoading)
  }

  patch<T = unknown>(config: IRequestConfig, isShowLoading = true) {
    return this.request<T>({ ...config, method: 'patch' }, isShowLoading)
  }

  delete<T = unknown>(config: IRequestConfig, isShowLoading = true) {
    return this.request<T>({ ...config, method: 'delete' }, isShowLoading)
  }
}

export default Request
