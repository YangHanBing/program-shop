import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import layout from '../layout'

const routes = [{
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      component: () => import('../views/index')
    }]
  },
  {
    path: '/sys',
    name: 'sys',
    component: layout,
    redirect: '/sys/goods',
    meta: {
      title: '商品管理',
      icon: 'personnel'
    },
    children: [{
        path: '/sys/goods',
        component: () => import('../views/goods'),
        name: 'sys-goods',
        meta: {
          title: '商品管理',
          icon: 'article'
        }
      },
      {
        path: '/sys/type',
        component: () => import('../views/type'),
        name: 'sys-type',
        meta: {
          title: '分类管理',
          icon: 'article'
        }
      },
      {
        path: '/sys/Specifications',
        component: () => import('../views/Specifications'),
        name: 'sys-Specifications',
        meta: {
          title: '规格管理',
          icon: 'article'
        }
      },
      {
        path: '/sys/coupon',
        component: () => import('../views/coupon'),
        name: 'sys-coupon',
        meta: {
          title: '优惠卷管理',
          icon: 'article'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
