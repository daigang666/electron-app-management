import { post, get } from '@/utils/request';

/**
 * @description: 获取充值产品列表
 */
export function getProduct(params: any) {
  return post({
    url: '/getProduct',
  });
}

export function payTest(params: any) {
  return get({
    url: '/payment/init',
    data: params,
  });
}

export function getPayStatus(params: any) {
  return get({
    url: '/payment/status',
    data: params,
  });
}
