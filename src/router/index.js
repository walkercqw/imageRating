import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import imageRating from '@/pages/imageRating'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path:'/imageRating',
      name:'imageRating',
      component:imageRating
    },
  ]
})
