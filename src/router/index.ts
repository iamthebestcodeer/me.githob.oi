import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HelloWorld.vue"),
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
