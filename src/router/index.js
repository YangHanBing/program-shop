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
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-page/404')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/error-page/401')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
