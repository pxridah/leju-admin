import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/myAuth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { clearAll } from '@/utils/myAuth'

// 页面进度条
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // 开始页面进度条
  NProgress.start()

  // 设置页面title
  document.title = getPageTitle(to.meta.title)

  // 获取token,判断是否登录
  const hasToken = getToken()

  if (hasToken) {
    if (store.state.user.asyncRoutes.length > 0) {
      // vuex 的 user模块已存routes
      // 重置本次请求路径下的按钮权限
      if (to.meta && to.meta.permissionValues) {
        store.commit('user/RESET_BTN_PERMI', to.meta.permissionValues)
      }
    } else {
      try {
        await store.dispatch('user/InitMenus')
        if (to.meta && to.meta.permissionValues) {
          // 重置本次请求路径下的按钮权限
          store.commit('user/RESET_BTN_PERMI', to.meta.permissionValues)
        }
        next({ ...to, replace: true })
      } catch (error) {
        Message.error('权限动态路由出错')
        clearAll()
        next('/login')
        NProgress.done()
      }
    }

    // 已登录
    if (to.path === '/login') {
      // 如果访问登录页, 跳转至首页
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 路径在白名单里, 放行
      next()
    } else {
      // 路径不在白名单里, 跳转至登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束页面进度条
  NProgress.done()
})
