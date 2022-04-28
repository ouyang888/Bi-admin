import { createRouter, createWebHashHistory } from 'vue-router'
import {Sdata} from './s'
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    // {  
    //   path: '/',
    //   redirect: '/s'
    // },
    {
      path: '/p',  
      name: 'p',
      component: () => import(/* webpackChunkName: "p" */ '../views/p.vue')
    },
    ...Sdata,
    {
      path: '/psi', 
      name: 'psi',
      component: () => import(/* webpackChunkName: "p" */ '../views/psi.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path:'/domesticSalesOnline',
      name:'domesticSalesOnline',
      component: () => import(/* webpackChunkName: "login" */ '../views/s.vue')
    },
    {
      path:'/domesticSalesOffline',
      name:'domesticSalesOffline',
      component: () => import(/* webpackChunkName: "login" */ '../views/s.vue')
    }
  ]
})

export default router