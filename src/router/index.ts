import { createRouter, createWebHistory } from 'vue-router'
// router
import routes from './routes'
// utils
import { showFullScreenNprogress, hideFullScreenNprogress } from '@/utils'

/**
 * @路由配置详解
 * 路由模式是：history
 * 引入方式：路由懒加载，打包时会代码分割，加快加载，import('@/pages/HomeView.vue')
 * <router-view></router-view> 标签是内置的，使用不需要引入
 * createWebHistory：路由基本前缀
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * 前置路由守卫获取 URL 中的 token
 */
router.beforeEach(async (to: any, _from: any, next: any) => {
  const title = to.meta?.title
  window.document.title = title || 'hello'

  showFullScreenNprogress()

  const [token] = useCookieState('admin-token')

  if (!token?.value && to?.path !== '/login') return next({ path: '/login' })

  if (token?.value && to?.path === '/login') return next({ path: '/' })
  next()
})

/**
 * 后置路由守卫
 *
 */
router.afterEach(() => {
  hideFullScreenNprogress()
})

export default router
