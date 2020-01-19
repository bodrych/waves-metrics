import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Peers from '@/views/Peers.vue'
import Balance from '@/views/Balance.vue'
import Pool from '@/views/Pool.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/peers',
    name: 'peers',
    component: Peers,
  },
  {
    path: '/balance',
    name: 'balance',
    component: Balance,
  },
  {
    path: '/pool',
    name: 'pool',
    component: Pool,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
