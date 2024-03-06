import { post, get } from '@/utils/request';

/**
 * @description: 获取绘图列表
 */
export function getImaginList() {
  return get({
    url: '/getTask',
  });
}
/**
 * @description: 提交绘图任务
 */
export function submitImaginTask(params: any) {
  return post({
    url: '/submitTask',
    data: params,
  });
}


