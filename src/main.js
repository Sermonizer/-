import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import './plugins/element'
import './style/global.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 将axios挂载到vue全局变量上
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
