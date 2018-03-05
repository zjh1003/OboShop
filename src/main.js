// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

//引入element-ui和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入接口文件
import axios from 'axios'
import api ,{domain} from './js/api.js'

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;

// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials=true;

//添加到原型，全局可用
Vue.prototype.$http = axios
Vue.prototype.$api = api

import 'normalize.css'
//使用element-ui
Vue.use(ElementUI)

import './less/index.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
