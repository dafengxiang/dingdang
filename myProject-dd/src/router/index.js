
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home.vue'
import Login from '../components/login/login.vue'
import Family from '../components/product/family.vue'
import Detail from '../components/product/productDetail.vue'
import Cart from '../components/product/cart.vue'
import myHom from '../components/login/myHom.vue'
import Return from '../components/login/return.vue'
Vue.use(Router)


export default new Router({
  routes: [
    {path:'/',redirect:"/Home"},
    {path:'/home',component:Home},
    {path:'/login',component:Login},
    {path:'/family',component:Family},
    {path:'/detail',component:Detail},
    {path:'/cart',component:Cart},
    {path:'/myhom',component:myHom},
    {path:'/return',component:Return}
  ]
})
