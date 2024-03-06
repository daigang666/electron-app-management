import { get, post } from '@/utils/request';

export function fetchUserInfoConfig<T = any>() {
  return post<T>({
    url: '/config',
  });
}

/**
 * @description: 邮箱验证
 */
export function sendPostEmail(params: any) {
  return post({
    url: '/sendEmail',
    data: params,
  });
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return post({
    url: '/login',
    data: params,
  });
}

// 用户注册
export function signup(params: any) {
  return post({
    url: '/signup',
    data: params,
  });
}

// 修改密码
export function modifyPassword(params: any) {
  return post({
    url: '/modifyPassword',
    data: params,
  });
}

// 用户token
export function protect(userinfo: any) {
  return post({
    url: '/protected',
    data: userinfo,
  });
}

export function getUserInfo() {
  return get({
    url: '/user/info',
  });
}
