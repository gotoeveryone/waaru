import Vue from "vue";
import VueGtag from "vue-gtag";
import router from "@/router";

if ((import.meta as any).env.VITE_ANALYTICS_ID) {
  Vue.use(
    VueGtag,
    {
      config: {
        id: (import.meta as any).env.VITE_ANALYTICS_ID
      }
    },
    router
  );
}
