import axios from "axios";
import store from "../store";

export const instance = axios.create({
  baseURL: "https://cocktails-backend.onrender.com/api/",
});

export const searchCocktailByName = async (name) => {
  const { data } = await instance.get(`drinks/search/${name}`);
  return data;
};

export const addCocktail = async (cocktail, file) => {
  const formData = new FormData();
  for (const key in cocktail) {
    formData.append(key, cocktail[key]);
  }
  formData.append("image", file);
  const { data } = await instance.post(`drinks/drink`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getCocktailById = async (cocktailId) => {
  const { data } = await instance.get(`drinks/drink/${cocktailId}`);
  return data;
};

export const getListOfIngredients = async () => {
  const { data } = await instance.get(`ingredients/list`);
  return data;
};

export const searchDrinksByIngredient = async (ingredient) => {
  const { data } = await instance.get(`drinks/filter?i=${ingredient}`);
  return data;
};

export const getRandomCocktails = async () => {
  const { data } = await instance.get("drinks/randoms");
  return data;
};

export const getFavoriteCocktails = async () => {
  const { data } = await instance.get("drinks/favorites");
  return data;
};

export const getMyCocktails = async () => {
  const { data } = await instance.get("drinks/my-drinks");
  return data;
};

export const getCocktailsByLetter = async (letter) => {
  const { data } = await instance.get(`drinks/list/${letter}`);
  return data;
};

export const getIngredientById = async (ingredient) => {
  const { data } = await instance.get(`ingredients/${ingredient}`);
  return data;
};

export const addRating = async (cocktailId, value) => {
  const { token } = store.state.auth;
  const { data } = await instance.post(
    `ratings/${cocktailId}`,
    { value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getAverageRating = async (cocktailId) => {
  const { data } = await instance.get(`ratings/${cocktailId}`);
  return data;
};
