import Vue from "vue";
import VueAnalytics from "vue-analytics";
import router from "@/router";

if (import.meta.env.NODE_ENV === "production") {
  Vue.use(VueAnalytics, {
    id: import.meta.env.VITE_APP_ANALYTICS_ID,
    router
  });
}
