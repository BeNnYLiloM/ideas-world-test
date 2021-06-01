import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/films',
    name: 'films',
    component: () => import('@/views/Films'),
  },
  {
    path: '/films/:id',
    name: 'filmDetail',
    component: () => import('@/views/FilmDetail'),
  },
  {
    path: '/tvshows',
    name: 'tvshows',
    component: () => import('@/views/Tvshows'),
  },
  {
    path: '/tvshows/:id',
    name: 'tvshowDetail',
    component: () => import('@/views/FilmDetail'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/views/Favorites'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
