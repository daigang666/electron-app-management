import axios, { type AxiosResponse } from 'axios'
console.log('process.env.NODE_ENV =', process.env.NODE_ENV)
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_API_BASE_URL
  baseURL:
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_APP_API_BASE_URL
      : import.meta.env.VITE_GLOB_API_URL
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) return response

    throw new Error(response.status.toString())
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
