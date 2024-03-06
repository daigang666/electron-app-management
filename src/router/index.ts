import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { ChatLayout } from '@/views/chat/layout'
import { getCookie } from '@/utils/utils'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/homePage',
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/index.vue')
      },
      {
        path: '/appDetail/:id',
        name: 'appDetail',
        component: () => import('@/views/appDetail/index.vue')
      },
      {
        path: '/drawer',
        name: 'drawer',
        component: () => import('@/views/drawer/index.vue')
      },
      {
        path: '/mind-map',
        name: 'mind-map',
        component: () => import('@/views/mindMap/index.vue')
      },
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue')
      }
    ]
  },

  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403/index.vue')
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
  protectedRouter(router)
  app.use(router)
  await router.isReady()
}

// 导航守卫
function protectedRouter(router: Router) {
  router.beforeEach((to, from, next) => {
    // const UserStore = useUserStore()
    // console.log('from:' + from.path);
    // console.log('UserStore.userInfo.isLogin:' + JSON.stringify(UserStore.userInfo));
    // if (!getCookie('token') && to.path !== '/login') {
    //   router.push('/login');
    // } else {
    next()
    // }
    // ...
    // 返回 false 以取消导航
    // return false
  })
}
