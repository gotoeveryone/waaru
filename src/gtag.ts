import Vue from "vue";
import VueGtag from "vue-gtag";
import router from "@/router";

if (process.env.VUE_APP_ANALYTICS_ID) {
  Vue.use(
    VueGtag,
    {
      config: {
        id: process.env.VUE_APP_ANALYTICS_ID
      }
    },
    router
  );
}
