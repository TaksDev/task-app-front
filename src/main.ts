import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(Vue3Toasity, {
    autoClose: 3000,
    // ...
  } as ToastContainerOptions)
  .mount("#app");
