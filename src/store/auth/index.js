import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const initialState = {
  user: null,
  token: "",
};

export default {
  namespaced: true,
  state: { ...initialState },
  actions,
  getters,
  mutations,
};
