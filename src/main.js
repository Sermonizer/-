import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import './plugins/element'
import './style/global.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

/**
 * 除了登录页面外，所有页面的访问都需要经过授权（即携带token）
 * 解决方法：添加请求拦截器，给请求头添加Authorization字段来进行验证
 * axois.interceptors.request: 请求拦截器，在访问服务器之前率先对请求进行更改
 */
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 将axios挂载到vue全局变量上
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
