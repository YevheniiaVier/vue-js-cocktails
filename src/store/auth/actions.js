import {
  loginUser,
  registerUser,
  logOutUser,
  getUser,
  setAuthHeader,
  clearAuthHeader,
  updateAvatar,
  } from "../../services/auth-api";

  import {toggleFavoriteCocktail} from '../../services/cocktails-api'
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

export const refreshUser = async ({ commit }) => {
  const { token } = store.state.auth;

  if (!token) {
    return;
  }
  try {
    const result = await getUser(token);
    commit("setUserData", result);
  } catch (error) {
    console.log(error);

    commit("clearUserData");
    clearAuthHeader();
    throw error;
  }
};

export const changeAvatar = async ({ commit }, payload) => {
  try {
    const { avatarURL, message } = await updateAvatar(payload);
    commit("setNewAvatar", avatarURL);
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleFavoriteList = async ({ commit }, payload) => {
  try {
    const { updatedUser} = await toggleFavoriteCocktail(payload);
    commit("setUserData", updatedUser
    );
 
  } catch (error) {
    console.log(error);
    throw error;
  }
};