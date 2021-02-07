import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import './plugins/element'
import './style/global.css'

new Vue({
  render: h => h(App)
}).$mount('#app')
