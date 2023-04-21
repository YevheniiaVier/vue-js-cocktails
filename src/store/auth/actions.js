import {
  loginUser,
  registerUser,
  logOutUser,
  getUser,
  setAuthHeader,
  clearAuthHeader,
} from "../../services/auth-api";

import store from "../../store";

export const login = async ({ commit }, payload) => {
  const data = await loginUser(payload);
  const { user, token } = data;
  commit("setUserData", user);
  commit("setToken", token);
  setAuthHeader(token);
};

export const registration = async ({ commit }, payload) => {
  const data = await registerUser(payload);
  const { user, token } = data;
  commit("setUserData", user);
  commit("setToken", token);
  setAuthHeader(token);
};

export const logOut = async ({ commit }) => {
  await logOutUser();
  commit("clearUserData");
  clearAuthHeader();
};

export const refreshUser = async () => {
  const { token } = store.state.auth;

  if (!token) {
    return alert("token is not valid");
  }
  try {
    const result = await getUser(token);
    return result;
  } catch (error) {
    throw error;
  }
};
