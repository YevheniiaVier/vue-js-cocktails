import axios from "axios";
import { instance } from './cocktails-api';

const authInstance = axios.create({
  baseURL: "https://cocktails-backend.onrender.com/api/",
});

export const setAuthHeader = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

};
export const clearAuthHeader = () => {
  authInstance.defaults.headers.common.Authorization = "";
  instance.defaults.headers.common.Authorization = "";

};

export const loginUser = async (user) => {
  const { data } = await authInstance.post("auth/login", user);
  return data;
};

export const registerUser = async (user) => {
  const { data } = await authInstance.post("auth/register", user);
  return data;
};

export const logOutUser = async () => {
  const { data: result } = await authInstance.post("auth/logout");
  clearAuthHeader();
  return result;
};

export const getUser = async (token) => {
  try {
    setAuthHeader(token);
    const { data } = await authInstance.get("/user/current");
    return data;
  } catch (error) {
    console.log(error);
    clearAuthHeader();
    throw error;
  }
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await authInstance.patch("/user/avatars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
