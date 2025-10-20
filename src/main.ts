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
