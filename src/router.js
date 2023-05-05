import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import leaflet from './components/leaflet.vue'
import olmvt from './components/olmvt.vue'
import mbx from './components/mapboxgl.vue'
import cgcs from './components/mapboxgl4490.vue'
import tdt from './components/mapboxglTdt.vue'
import sandDance from './components/sandDance.vue'
import olDynamic from './components/olDynamicLayer.vue'
import encrypt from './components/encrypt.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: leaflet
    },
    {
      path: '/en',
      name: 'en',
      component: encrypt
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/oldy',
      name: 'oldy',
      component: olDynamic
    },
    {
      path: '/ol',
      name: 'olmvt',
      component: olmvt
    },
    {
      path: '/mbx',
      name: 'mbx',
      component: mbx
    },
    {
      path: '/tdt',
      name: 'tdt',
      component: tdt
    },
    {
      path: '/cgcs',
      name: 'cgcs',
      component: cgcs
    },
    {
      path: '/sand',
      name: 'sand',
      component: sandDance
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
