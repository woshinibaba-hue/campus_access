import axios, { AxiosError, AxiosInstance } from 'axios'

import NProgress from 'nprogress'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' //指定进度条的父容器
})

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
        if (Array.isArray(err.response?.data.message)) {
          if (err.response?.data.message.length) {
            ElMessage.error(err.response?.data.message[0])
          } else {
            ElMessage.error(err.response?.data.message)
          }
        } else {
          ElMessage.error(err.message)
        }
        return Promise.reject(err)
      }
    )
  }

  // 请求方法
  private request<T = unknown>(requestConfig: IRequestConfig) {
    // 开启loading
    NProgress.start()
    return new Promise<IDataResult<T>>((resolve, reject) => {
      this.instance
        .request<unknown, IDataResult<T>>(requestConfig)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          // 关闭loading
          NProgress.done()
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
