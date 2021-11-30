/*
 * @Author: your name
 * @Date: 2021-11-16 17:22:46
 * @LastEditTime: 2021-11-28 20:27:51
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
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('tree-table', TreeTable)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.filter('dateFormat',function(time){
  const date = new Date(time);
  const Y = date.getFullYear();
  const M = (date.getMonth()+1 +'').padStart(2,'0')
  const D = (date.getDay() +'').padStart(2,'0')
  const H = (date.getHours() +'').padStart(2,'0')
  const m = (date.getMinutes() +'').padStart(2,'0')
  const s = (date.getSeconds() +'').padStart(2,'0')
  return `${Y}-${M}-${D} ${H}:${m}:${s}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
