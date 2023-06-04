import firebase from "firebase/app";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./analytics";
import "./vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

// Firebase の設定
const config = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: (h: Function) => h(App)
}).$mount("#app");
