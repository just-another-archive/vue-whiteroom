import Vue from "vue";
import Router from "vue-router";

import App from "./app.vue";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "*",
    component: App
  }]
});
