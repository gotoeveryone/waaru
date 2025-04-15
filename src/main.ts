import firebase from "firebase/app";
import { createApp } from "vue";
import { createGtag } from "vue-gtag";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/vuetify";

// Firebase の設定
const config = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: (import.meta as any).env.VITE_FIREBASE_DATABASE_URL,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const app = createApp(App).use(router).use(vuetify);

if ((import.meta as any).env.VITE_ANALYTICS_ID) {
  const gtag = createGtag({
    tagId: (import.meta as any).env.VITE_ANALYTICS_ID,
    pageTracker: { router }
  });
  app.use(gtag);
}

app.mount("#app");
