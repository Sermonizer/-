import Vue from 'vue'
import Router from 'vue-router'
import Login from './component/Login.vue'
import Home from './component/Home.vue'

Vue.use(Router)

const router = new Router({
  // 自定义路由规则，当访问/login时页面渲染Login.vue文件
  routes: [
    // 路由重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

/**
 * 如果用户没有登录，直接通过指定URL导航到相应页面，不安全
 * 这时就需要路由导航守卫，将未登录的访问定位到登录页
 * 为路由对象挂载beforeEach导航守卫：
 * @to 将要访问的路径
 * @from 从哪个路径跳转而来
 * @next 表示放行的函数
 */

router.beforeEach((to, from, next) => {
  // 用户访问登录页，直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，导航至登录页
  if (!tokenStr) return next('./login')
  // 有token，继续
  next()
})

export default router
