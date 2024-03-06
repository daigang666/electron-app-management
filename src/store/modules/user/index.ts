import { defineStore } from 'pinia';
import type { UserInfo, UserState } from './helper';
import { defaultSetting, getLocalState, setLocalState } from './helper';
import { login, signup, protect, modifyPassword, getUserInfo } from '@/api/user';

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo };
      this.recordState();
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo };
      this.recordState();
    },

    recordState() {
      setLocalState(this.$state);
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await getUserInfo();
        console.log(res);
        this.updateUserInfo(res.data);
      } catch (e) {
        console.log('e:' + JSON.stringify(e));
        return Promise.resolve(e);
      }
    },
    // 登录
    async login(userInfo: any) {
      try {
        const data = await login(userInfo);
        return Promise.resolve(data);
      } catch (e) {
        // console.log('e:' + JSON.stringify(e));
        return Promise.resolve(e);
      }
    },
    // 注册
    async signup(userInfo: any) {
      try {
        const data = await signup(userInfo);
        // console.log('signup------------:' + JSON.stringify(data));
        return Promise.resolve(data);
      } catch (e) {
        // console.log('signup:' + JSON.stringify(e));
        return Promise.resolve(e);
      }
    },
    // 修改密码
    async modifyPassword(userInfo: any) {
      try {
        const data = await modifyPassword(userInfo);
        return Promise.resolve(data);
      } catch (e) {
        return Promise.resolve(e);
      }
    },
    // 守卫测试
    async protect(userInfo: any) {
      try {
        const data = await protect(userInfo);
        return Promise.resolve(data);
      } catch (e) {
        return Promise.resolve(e);
      }
    },
  },
});
