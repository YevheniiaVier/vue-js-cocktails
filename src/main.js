import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/index.scss";

const app = createApp(App);

app.use(router).use(store).mount("#app");
