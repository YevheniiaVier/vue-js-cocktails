import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const initialState = {
  user: {},
  token: "",
};

export default {
  namespaced: true,
  state: { ...initialState },
  actions,
  getters,
  mutations,
};
