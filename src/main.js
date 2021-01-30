import Vue from 'vue'
import App from './App.vue'
import '../src/style/global.css'
// 按需加载element-ui的组件
import { Button, Form, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 将引入的组件注册为全局组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)

new Vue({
  render: h => h(App)
}).$mount('#app')
