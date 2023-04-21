import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModule from "./auth";

const dataState = createPersistedState({
  paths: ["auth.token"],
});

const store = createStore({
  modules: {
    auth: authModule,
  },
  plugins: [dataState],
});

export default store;
