import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "./assets/js/bootstrap.min.js";
import "./assets/js/app.js";
import "./assets/js/jquery.appear.js";
import "./assets/js/custom.js";

router.afterEach((to, from) => {
  if (to.hash) {
    const element = document.querySelector(to.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
});

createApp(App).use(store).use(router).mount("#app");
