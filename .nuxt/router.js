import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7714db00 = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages/air/index" */))
const _70417bd6 = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages/hotel/index" */))
const _70cfd72a = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages/post/index" */))
const _4705e56c = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _1c892bb0 = () => interopDefault(import('..\\pages\\tsetone.vue' /* webpackChunkName: "pages/tsetone" */))
const _c1fb29c2 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _9810749e = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages/air/flights" */))
const _457f5a08 = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages/air/order" */))
const _44114cd6 = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages/air/pay" */))
const _30410e7d = () => interopDefault(import('..\\pages\\hotel\\detail.vue' /* webpackChunkName: "pages/hotel/detail" */))
const _c846cd64 = () => interopDefault(import('..\\pages\\post\\article.vue' /* webpackChunkName: "pages/post/article" */))
const _417e1da9 = () => interopDefault(import('..\\pages\\post\\detail.vue' /* webpackChunkName: "pages/post/detail" */))
const _68aa0e36 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages/user/login" */))
const _0b888ffa = () => interopDefault(import('..\\pages\\user\\personal.vue' /* webpackChunkName: "pages/user/personal" */))
const _680b516c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/xingyue/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/air",
    component: _7714db00,
    name: "air"
  }, {
    path: "/hotel",
    component: _70417bd6,
    name: "hotel"
  }, {
    path: "/post",
    component: _70cfd72a,
    name: "post"
  }, {
    path: "/test",
    component: _4705e56c,
    name: "test"
  }, {
    path: "/tsetone",
    component: _1c892bb0,
    name: "tsetone"
  }, {
    path: "/user",
    component: _c1fb29c2,
    name: "user"
  }, {
    path: "/air/flights",
    component: _9810749e,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _457f5a08,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _44114cd6,
    name: "air-pay"
  }, {
    path: "/hotel/detail",
    component: _30410e7d,
    name: "hotel-detail"
  }, {
    path: "/post/article",
    component: _c846cd64,
    name: "post-article"
  }, {
    path: "/post/detail",
    component: _417e1da9,
    name: "post-detail"
  }, {
    path: "/user/login",
    component: _68aa0e36,
    name: "user-login"
  }, {
    path: "/user/personal",
    component: _0b888ffa,
    name: "user-personal"
  }, {
    path: "/",
    component: _680b516c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
