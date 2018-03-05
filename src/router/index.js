import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/account/login/Login.vue'
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
  { name:'detail', path:'detail', component:Detail }
]

const pay = [
  { name:'address', path:'address', component:Address },
  { name:'complete', path:'complete', component:Complete },
  { name:'pay', path:'pay', component:Pay }
]

const shoppingcart = [
  { name:'shoppingcart', path:'shoppingcart', component:Shoppingcart }
]

export default new Router({
  routes: [
      { name: 'login', path: '/login', component:Login },
      { name: 'shop', path: '/shop', component:Shop ,children:[...goods,...pay,...shoppingcart]}
  ]
})
