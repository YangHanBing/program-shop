import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'layout',
    component: () => import('../layout'),
    children: [{
      path: '/',
      name: 'layout',
      component: () => import('../views')
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
