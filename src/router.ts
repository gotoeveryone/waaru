import { createWebHistory, createRouter } from "vue-router";
import About from "./views/About.vue";
import Home from "./views/Home.vue";
import EventDetail from "./views/EventDetail.vue";
import NotFound from "./views/NotFound.vue";

export default createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/events/new",
      name: "add-event",
      component: EventDetail,
    },
    {
      path: "/events/:id",
      name: "edit-event",
      component: EventDetail,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});
