import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../components/BlogList.vue"),
  },
  {
    path: "/blog/:slug",
    name: "BlogDetail",
    component: () => import("../components/BlogDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
