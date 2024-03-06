import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  role: string
  isLogin: boolean
  token: string
  quota3: number,
  quota4: number,
  vipdate: string,
  model: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/WallercChen/chatgpt-web/main/src/assets/avatar.jpg',
      name: window.localStorage.getItem('userName') || '游客',
      description: '',
      role: '',
      isLogin: false,
      token: '',
      quota3: window.localStorage.getItem('quota3') as unknown as number || 0,
      quota4: window.localStorage.getItem('quota4') as unknown as number || 0,
      vipdate: window.localStorage.getItem('vipdate') || '',
      model: 'gpt-3.5-turbo-0301'
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  // console.log('-----------------:' +  JSON.stringify({ ...defaultSetting() }));
  return {  ...localSetting, ...defaultSetting()}
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
