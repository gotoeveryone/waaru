import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Home from "./views/Home.vue";
import EventDetail from "./views/EventDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/events/new",
      name: "add-event",
      component: EventDetail
    },
    {
      path: "/events/:id",
      name: "edit-event",
      component: EventDetail
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
