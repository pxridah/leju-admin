import { getInitMenus } from '@/api/login/index'
import { resetRouter } from '@/router'
import router from '@/router'
import Layout from '@/layout'

const getDefaultState = () => {
  return {
    asyncRoutes: [], // 当前用户拥有的菜单列表
    btnPermissions: [] // 页面按钮级别的路由权限
  }
}

const state = getDefaultState()

const mutations = {
  // 设置动态路由
  SET_ASYNC_ROUTES(state, asyncRoutes) {
    state.asyncRoutes = asyncRoutes
  },

  // 重置按钮权限
  RESET_BTN_PERMI(state, permissions) {
    state.btnPermissions = permissions
  },

  // 清除权限列表
  REMOVE_USERINFO(stata) {
    state.asyncRoutes = []
    state.btnPermissions = []
  },

  CLEAR_BTN_PEREMI(state) {
    state.btnPermissions = []
  }

}

const actions = {
  // 初始化菜单
  InitMenus({ commit, state }) {
    function buildRoutes(routes, pList, pRoute) {
      for (let i = 0; i < pList.length; i++) {
        var p = pList[i]
        if (p.type === 1) {
          // 路由
          var route = {
            path: p.path,
            name: p.name
          }
          if (p.pid === '0') {
            // 最上层路由
            route.component = Layout
          } else {
            // p.component= '@/views/product/index'
            var path = p.component.replace(/^@\/views/, '')
            // path = /product/index
            route.component = (path => {
              // 闭包+立即执行  防止path因为懒加载 只显示最后一个p的path值
              // import 引入组件 不支持路径是变量
              return (resolve) => {
                // require 虽然支持变量 但必须有一个根问价夹
                require([`@/views${path}`], resolve)
              }
            })(path)
          }
          if (p.redirect) {
            route.redirect = p.redirect
          }
          if (p.meta) {
            route.meta = JSON.parse(p.meta)
          }
          if (p.hidden) {
            route.hidden = true
          }
          if (p.alwaysShow) {
            route.alwaysShow = true
          }
          routes.push(route)
          if (p.children && p.children.length > 0) {
            route.children = []
            // 递归
            buildRoutes(route.children, p.children, route)
          }
        } else {
          // 按钮
          delete pRoute.children
          if (!pRoute.meta.permissionValues) {
            pRoute.meta.permissionValues = []
          }
          pRoute.meta.permissionValues.push(p.permissionValue)
        }
      }
    }
    return new Promise((resolve, reject) => {
      getInitMenus().then(res => {
        var routes = []
        var pList = res.data.permissionList
        // 将返回的数据, 格式化为vue-router的数据格式
        buildRoutes(routes, pList)
        // 这个路由要放到最末尾
        routes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ASYNC_ROUTES', routes)

        resetRouter()
        // 这里用于构建完整路由
        router.addRoutes(routes)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

