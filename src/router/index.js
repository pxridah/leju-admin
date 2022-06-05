import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'auth' }
    }]
  },
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/role',
    name: 'auth',
    meta: { title: '权限管理', icon: 'auth' },
    children: [
      {
        path: 'user',
        name: 'authUser',
        component: () => import('@/views/auth/user/index'),
        meta: { title: '账号管理', icon: 'account' }
      },
      {
        path: 'role',
        name: 'authRole',
        component: () => import('@/views/auth/role/index'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'permission',
        name: 'authPermission',
        component: () => import('@/views/auth/permission/index'),
        meta: { title: '资源管理', icon: 'menu' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

// 动态路由, 配合权限实现
// 区分动态路由  配合权限实现
export const asyncRoutes = [
  // 商品路由
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    alwaysShow: true,
    children: [{
      path: 'list',
      name: 'productList',
      component: () =>
        import('@/views/product/index'),
      meta: { title: '商品列表', icon: 'el-icon-shopping-bag-2', componentUrl: '@/views/product/index' }

    },
    {
      path: 'category',
      name: 'productCategory',
      component: () =>
        import('@/views/product/category/index'),
      meta: { title: '商品分类', icon: 'el-icon-menu', componentUrl: '@/views/product/category/index' }
    },
    {
      path: 'brand',
      name: 'productBrand',
      component: () =>
        import('@/views/product/brand/index'),
      meta: { title: '品牌管理', icon: 'el-icon-present', componentUrl: '@/views/product/brand/index' }
    },
    {
      path: 'detail/:id',
      name: 'productDetail',
      // 不在左侧导航栏显示
      hidden: true,
      component: () =>
        import('@/views/product/detail/index'),
      meta: { title: '商品编辑', icon: 'table', activeMenu: '/product/list', componentUrl: '@/views/product/detail/index' }
    },
    {
      path: 'addDetail',
      name: 'addProductDetail',
      // 不在左侧导航栏显示
      hidden: true,
      component: () =>
        import('@/views/product/detail/index'),
      meta: { title: '新增商品', icon: 'table', activeMenu: '/product/list', componentUrl: '@/views/product/detail/index' }
    }
    ]
  },
  // 订单路由
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    alwaysShow: true,
    meta: { title: '订单管理', icon: 'el-icon-tickets' },
    children: [
      {

        path: 'list',
        name: 'orderList',
        component: () =>
          import('@/views/order/index'),
        meta: { title: '订单列表', icon: 'el-icon-document-checked', componentUrl: '@/views/order/index' }
      },
      {
        path: 'detail/:id',
        name: 'orderDetail',
        hidden: true,
        component: () =>
          import('@/views/order/detail/index'),
        meta: { title: '订单详情', icon: 'table', activeMenu: '/order/list', componentUrl: '@/views/order/detail/index' }
      },
      {
        path: 'back',
        name: 'orderBack',
        component: () =>
          import('@/views/order/orderBack/index'),
        meta: { title: '退单列表', icon: 'el-icon-document-delete', componentUrl: '@/views/order/orderBack/index' }
      },
      {
        path: 'backDetail/:id',
        name: 'orderBackDetail',
        hidden: true,
        component: () =>
          import('@/views/order/orderBack/detail/index'),
        meta: { title: '退单详情', icon: 'table', activeMenu: '/order/back', componentUrl: '@/views/order/orderBack/detail/index' }
      },
      {
        path: 'address',
        name: 'orderAddress',
        component: () =>
          import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'el-icon-school', componentUrl: '@/views/order/address/index' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: { title: '注册用户管理', icon: 'el-icon-s-custom' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () =>
          import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-user', componentUrl: '@/views/user/index' }
      }

    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/list',
    name: 'market',
    meta: { title: '营销管理', icon: 'el-icon-goods' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'marketList',
        component: () =>
          import('@/views/market/index'),
        meta: { title: '限时活动', icon: 'el-icon-files', componentUrl: '@/views/market/index' }
      },
      {
        path: 'advertisement',
        name: 'marketAdvertisement',
        component: () =>
          import('@/views/market/advertisement/index'),
        meta: { title: '广告列表', icon: 'el-icon-document-copy', componentUrl: '@/views/market/advertisement/index' }
      }

    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/articleList',
    name: 'content',
    meta: { title: '内容管理', icon: 'el-icon-folder' },
    alwaysShow: true,
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        component: () =>
          import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'el-icon-tickets', componentUrl: '@/views/content/article/index' }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        hidden: true,
        component: () =>
          import('@/views/content/article/detail/index'),
        meta: { title: '新增文章', icon: 'el-icon-tickets', activeMenu: '/content/articleList', componentUrl: '@/views/content/article/detail/index' }
      },
      {
        path: 'editArticle/:id',
        name: 'editArticle',
        hidden: true,
        component: () =>
          import('@/views/content/article/detail/index'),
        meta: { title: '编辑文章', icon: 'el-icon-tickets', activeMenu: '/content/articleList', componentUrl: '@/views/content/article/detail/index' }
      },
      {
        path: 'materialList',
        name: 'materialList',
        component: () =>
          import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'el-icon-picture-outline', componentUrl: '@/views/content/material/index' }
      }

    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    name: 'person',
    meta: { title: '个人中心', icon: 'el-icon-user-solid' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'personIndex',
        component: () =>
          import('@/views/person/index'),
        meta: { title: '个人主页', icon: 'el-icon-user', componentUrl: '@/views/person/index' }
      },
      {
        path: 'setting',
        name: 'personSetting',
        component: () =>
          import('@/views/person/Setting/index'),
        meta: { title: '个人设置', icon: 'el-icon-setting', componentUrl: '@/views/person/Setting/index' }
      }

    ]
  },
  {
    path: '/test',
    name: 'test',
    redirect: '/test/index',
    alwaysShow: true,
    meta: { title: '测试2102', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        name: 'testIndex',
        meta: { title: '个人设置', icon: 'el-icon-setting', componentUrl: '@/views/test/index' }
      }
    ]
  }
  // 物流管理
  // {
  //     path: '/delivery',
  //     name: 'Delivery',
  //     redirect: '/delivery/index',
  //     alwaysShow: true,
  //     meta: { title: '物流管理', icon: 'el-icon-setting' },
  //     children: [
  //         {
  //             path: 'index',
  //             name: 'DeliveryList',
  //             meta: { title: '物流列表', icon: 'el-icon-setting', componentUrl: '@/views/delivery/index' }
  //         }
  //     ]
  // }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
