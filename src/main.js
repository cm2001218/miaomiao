import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
Vue.prototype.axios = axios;

import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUI);

// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";
// Vue.use(Swiper);

import Scroller from "@/components/Scroller";
Vue.component("Scroller", Scroller);

import Loading from "@/components/Loading";
Vue.component("Loading", Loading);

Vue.filter("setWH", (url, arg) => {
  return url.replace(/w\.h/, arg);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
