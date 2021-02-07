import Vue from 'vue'
import Router from 'vue-router'
import Login from './component/Login.vue'

Vue.use(Router)

export default new Router({
  // 自定义路由规则，当访问/login时页面渲染Login.vue文件
  routes: [
    // 路由重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
