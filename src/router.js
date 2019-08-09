import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import {SPACE_TIME} from '@/config/config'
import Home from './views/home/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/system',
      name: 'system',
      component: () => import( './views/system/index'),
      children:[
        {
          path: '/system',
          redirect: '/system/yunwei'
        },
        {
          path: '/system/yunwei',
          name: 'yunwei',
          component: () => import( './views/yunwei/index.vue')
        },
        {
          path: '/system/user',
          name: 'user',
          component: () => import( './views/user/index.vue')
        }
      ]
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import( './views/statistics/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/login/index')
    }
  ]
})





//路由守卫
// router.beforeEach((to,from,next)=>{

//   let newTime = new Date().getTime();
//   let curTime = localStorage.curTime;

//   if(newTime-curTime>SPACE_TIME){
//     store.dispatch('setLogin',false);
//     localStorage.removeItem('eleToken');
//   }

//   const isLogin = store.state.isLogin
  
//   if (to.path == "/login") {
//     next()
//   }else{
//     isLogin ? next() : next({path: "/login", replace: true})
//   }

// })

export default router