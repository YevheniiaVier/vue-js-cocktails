import axios from "axios";
import store from "../store";

const authInstance = axios.create({
  baseURL: "https://apt-booking-api.herokuapp.com/",
});

export const setAuthHeader = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  authInstance.defaults.headers.common.Authorization = "";
};

export const loginUser = async (user) => {
  const { data } = await authInstance.post("users/login", user);
  return data;
};

export const registerUser = async (user) => {
  const { data } = await authInstance.post("users/register", user);
  return data;
};

export const logOutUser = async () => {
  const { data: result } = await authInstance.post("users/logout");
  clearAuthHeader();
  return result;
};

export const getUser = async (token) => {
  try {
    setAuthHeader(token);

    const { data } = await authInstance.get("/users/current");
    return data;
  } catch (error) {
    clearAuthHeader();
    throw error;
  }
};
