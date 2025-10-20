import { createApp } from "vue";
import "./style.css";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: ".dark",
      cssLayer: false,
    },
  },
});
app.mount("#app");

// Prefetch lazy routes when the browser is idle to speed up subsequent navigation
const prefetch = () => {
  // Blog list and detail are code-split routes; preloading their chunks improves TTI on navigation
  import("./components/BlogList.vue");
  import("./components/BlogDetail.vue");
};
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      prefetch();
    });
  } else {
    const PREFETCH_DELAY_MS = 1500;
    setTimeout(prefetch, PREFETCH_DELAY_MS);
  }
}
