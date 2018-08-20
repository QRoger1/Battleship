import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { Vue2Dragula } from "../node_modules/vue2-dragula";

Vue.config.productionTip = false;

Vue.use(Vue2Dragula, {
  logging: {
    directive: true,
    plugin: true,
    service: true,
    dragHandler: true,
    modelManager: true
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.push("/boardsetup");
