import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Element from "element-ui";
import echarts from "echarts";

import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";

import SlideVerify from "vue-monoplasty-slide-verify";
Vue.use(SlideVerify);

import "./assets/css/global.css";

Vue.use(Element);
Vue.prototype.$http = axios;

Vue.prototype.$echarts = echarts;

axios.defaults.baseURL = "http://localhost:9000/api/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
