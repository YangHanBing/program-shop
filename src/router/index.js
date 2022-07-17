import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/index',
    name: 'index',
    component: () => import('../views/index')
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
