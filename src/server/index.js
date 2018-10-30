import Vue from 'vue'
import store from './store'
import router from './router'

new Vue({
  store,
  router,
  render: h => h(Vue.component('router-view'))
}).$mount("#whiteroom")
