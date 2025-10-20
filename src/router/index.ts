import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "../components/BlogDetail.vue";
import BlogList from "../components/BlogList.vue";
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
    component: BlogList,
  },
  {
    path: "/blog/:slug",
    name: "BlogDetail",
    component: BlogDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
