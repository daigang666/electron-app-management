import type { AxiosProgressEvent, AxiosResponse, GenericAbortSignal } from 'axios';
import request from './axios';
import { getCookie } from '@/utils/utils';
import { router } from '@/router/index';

export interface HttpOption {
  url: string;
  data?: any;
  method?: string;
  headers?: any;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: GenericAbortSignal;
  beforeRequest?: () => void;
  afterRequest?: () => void;
}

export interface Response<T = any> {
  data: T;
  message: string | null;
  status: string | 0 | 1;
}

function http<T = any>({
  url,
  data,
  method,
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    if (
      res.data.status === 'Success' ||
      res.data.status === 0 ||
      typeof res.data === 'string' ||
      typeof res.data?.message === 'string'
    ) {
      return res.data;
    }

    return Promise.reject(res.data);
  };

  const failHandler = (error: Response<Error>) => {
    // console.log('e:' + Object.keys(error))
    // console.log('e:' + error?.code)
    // console.log('e:' + JSON.stringify(error?.request))
    const isAuth = error?.message || 'Error';
    if (isAuth?.indexOf('401') !== -1) {
      router.push('/login');
    }
    afterRequest?.();
    throw new Error(error?.message || 'Error');
  };

  beforeRequest?.();

  method = method || 'GET';

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {});

  return method === 'GET'
    ? request
        .get(url, { headers, params, signal, onDownloadProgress })
        .then(successHandler, failHandler)
    : request
        .post(url, params, { headers, signal, onDownloadProgress })
        .then(successHandler, failHandler);
}

export function get<T = any>({
  url,
  data,
  method = 'GET',
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers: {
      Authorization: 'Bearer ' + getCookie('token'),
    },
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

export function post<T = any>({
  url,
  data,
  method = 'POST',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data: {
      ...data,
      clientModel: window.localStorage.getItem('model') || 'gpt-4',
      clientName: window.localStorage.getItem('userName'),
    },
    headers: {
      Authorization: 'Bearer ' + getCookie('token'),
      ...headers,
    },
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

export default post;
