import { type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/page/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/page/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: '/home',
        redirect: '/',
      },
      {
        path: '/goods/list',
        name: 'GoodsList',
        component: () => import('@/page/goods/goods-list/index.vue'),
        meta: {
          title: '商品列表',
          keepAlive: true,
        },
      },
      {
        path: '/notice/list',
        name: 'NoticeListPage',
        component: () => import('@/page/other/notice-list/index.vue'),
        meta: {
          title: '公告列表',
          keepAlive: true,
        },
      },
      {
        path: '/manager/list',
        name: 'ManagerListPage',
        component: () => import('@/page/manager/manager-list/index.vue'),
        meta: {
          title: '管理员列表',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/page/not-found-page.vue'),
    meta: {
      title: '页面未找到',
    },
  },
]

export default routes
