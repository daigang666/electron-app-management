import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { get, post } from '@/utils/request'

export const API_CONFIG = {
  //解密KEY
  JmKey: function () {
    return '1212121212121212'
  },
  //解密KEY
  JmIv: function () {
    return '3434343434343434'
  }
}
export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config'
  })
}

export function fetchChatAPIProcess<T = any>(params: {
  prompt: string
  options?: { conversationId?: string; parentMessageId?: string }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
  return post<T>({
    url: '/chat-process',
    data: { prompt: params.prompt, options: params.options },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress
  })
}

export function getAppinfo(id: any) {
  return get({
    url: '/api/getAppinfo',
    data: { id }
  })
}

export function getNewhotApp(params: string) {
  return get({
    url: `/api/newhotApp?paixu=${params}&page=1&limit=10`
    // data: params,
  })
}
