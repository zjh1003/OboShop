import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/account/Login.vue'
import Register from '../components/account/Register.vue'
import Shop from '../components/shop/Shop.vue'
import List from '../components/shop/goods/List.vue'
import Detail from '../components/shop/goods/Detail.vue'
import Address from '../components/shop/order/Address.vue'
import Pay from '../components/shop/order/Pay.vue'
import Complete from '../components/shop/order/Complete.vue'
import Shoppingcart from '../components/shop/shoppingcart/Shoppingcart.vue'

Vue.use(Router)

// 子组件
const goods = [
  { name:'list', path:'list', component:List },
  { name:'detail', path:'detail/:id', component:Detail }
]

const pay = [
  { name:'address', path:'address/:ids', component:Address },
  { name:'complete', path:'complete', component:Complete },
  { name:'pay', path:'pay/:id', component:Pay }
]

const shoppingcart = [
  { name:'shoppingcart', path:'shoppingcart', component:Shoppingcart }
]

// const account = [
//   { name:'login', path:'login', component:Login },
//   { name:'register', path:'register', component:Register }
// ]

let router =  new Router({
  routes: [
      { name: 'login', path:'/login', component: Login },
      { name: 'register', path:'/register', component: Register },
      { name: 'shop', path: '/shop', component:Shop ,children:[...goods,...pay,...shoppingcart]}
  ]
})


// 网站白名单, 加到这里页面都不用校验登陆权限
let ignore = ['list', 'detail', 'shoppingcart']

router.beforeEach((to, from, next) => {
  
  //判断当前访问的页面是否在白名单中
  let isTrue = ignore.some(v => v == to.name)
  
  //如果访问的白名单页面，直接通过，
  if(isTrue){
    next();
    return;
  }

  //调用后台接口，判断是否登录
  Vue.prototype.$http.get(Vue.prototype.$api.isLogin).then(res => {
      
      var islogin = false;

      if(res.data.code == 'logined'){
          islogin = true;
      }

      //访问登录页面，判断是否登录
      //如果登录=>直接调转到后台首页
      if(to.name == 'login'){
          if(islogin){
              next({name:'list'});
          }else{
              next();
          }
      }

      //访问后台页面
      //如果登录过，直接访问，
      //如果没有登录，调到登录页面
      if(to.name != 'login'){
          if(islogin){
              next();
          }else{

              // query用来设置url中的查询字符串, 我们这里把用户要访问的页面地址通过query记录下来
              //next下一步要访问的页面, to.fullPath:要访问的目标页面的全路径
              // 将来用户登陆成功后, 再自动跳回这个地址
              next({name:'login', query:{next:to.fullPath}});
          }
      }

  })
  
})


export default router;