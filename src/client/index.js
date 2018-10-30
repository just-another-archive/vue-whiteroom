import Vue from 'vue'
import store from './store'

import App from './app.vue'

new Vue({
  store,
  render: h => h(App)
}).$mount("#microscope")
