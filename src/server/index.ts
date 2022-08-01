import Request from './request'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const request = new Request({
  baseURL: BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInstance: (config) => {
      return config
    },
    requestInstanceCatch: (error) => {
      return Promise.reject(error)
    },
    responseInstance: (config) => {
      return config
    },
    responseInstanceCatch: (error) => {
      return Promise.reject(error)
    }
  },
  withCredentials: true
})

export default request
