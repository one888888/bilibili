// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import http from '../http.js'
import { Toast } from 'vant';


Vue.prototype.$http=http
Vue.prototype.$msg=Toast
Vue.config.productionTip = false
Vue.use(Vant)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})