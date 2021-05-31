import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import register from '../components/register.vue'
import login from '../components/login.vue'
import userInfo from '../components/userInfo.vue'
import edit from '../components/edit.vue'
import home from '../components/home.vue'
import article from '../components/article.vue'


Vue.use(Router)


const routes=[

  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/home',
    component: home,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/article/:id',
    component: article
  },
  {
    path: '/userInfo',
    component: userInfo,
    meta:{
      istoken:true
    }
  },
  {
    path: '/edit',
    component: edit,
    meta:{
      istoken:true
    }
  },

]


const router=new Router({
  routes,
  mode:'history'
})


router.beforeEach((to,from,next)=>{
  if((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()

})

export default router
