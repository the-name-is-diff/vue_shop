/*
 * @Author: your name
 * @Date: 2021-11-16 17:22:46
 * @LastEditTime: 2021-11-17 17:22:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Welcome from '../components/Welcome'
import User from '../components/user/User'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    // redirect:'/welcome',
    children:[
      {
        path:'',
        component:Welcome
      },
      {
        path:'/users',
        component:User
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next();
  }
  if(window.sessionStorage.getItem('token')){
    next()
  }
  else{
    next('/login')
  }
})

export default router
