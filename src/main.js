import { createApp } from "vue";
import App from "./App.vue";
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
import router from "./router";
import store from "./store";
import "./assets/scss/index.scss";

const app = createApp(App);
app.use(SimpleTypeahead);
app.use(router).use(store).mount("#app");
