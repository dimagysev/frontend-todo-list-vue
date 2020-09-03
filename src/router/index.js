import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta: {
      authenticated: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Registration'),
    meta: {
      authenticated: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth) && !store.getters.isAuth) {
    next({ path: '/login' })
  }
  if (to.matched.some(record => record.meta.authenticated) && store.getters.isAuth) {
    next({ path: '/' })
  }
  next()
})

export default router
