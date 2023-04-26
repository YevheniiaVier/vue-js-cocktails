import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModule from "./auth";
import cocktailsModule from "./cocktails";
import filterModule from "./filter";
const dataState = createPersistedState({
  paths: ["auth.token"],
});

const store = createStore({
  modules: {
    auth: authModule,
    cocktails: cocktailsModule,
    filter: filterModule,
  },
  plugins: [dataState],
});

export default store;
