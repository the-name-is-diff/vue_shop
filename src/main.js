/*
 * @Author: your name
 * @Date: 2021-11-16 17:22:46
 * @LastEditTime: 2021-11-30 09:35:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css'
import TreeTable from 'vue-table-with-tree-grid'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('tree-table', TreeTable)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear;
  const m = (dt.getMonth +1 +'').padStart(2,'0')
  const d = (dt.getMonth +'').padStart(2,'0')
  const h = (dt.getHours +'').padStart(2,'0')
  const M = (dt.getMinutes +'').padStart(2,'0')
  const s = (dt.getSeconds +'').padStart(2,'0')
  return `${y}-${m}-${d} ${h}:${M}:${s}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
