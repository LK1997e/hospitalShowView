// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './vuex/store'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if(from.path !== '/loginCheck'){
  //   location.reload();
  // }
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
    // sessionStorage.removeItem('route');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  // let route = JSON.parse(sessionStorage.getItem('route'));


  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})




