import axios from "axios";
import store from "../store";
export const instance = axios.create({
  baseURL: "https://cocktails-backend.onrender.com/api/",
});

export const searchCocktailByName = async (name) => {
  const { data } = await instance.get(`drinks/search/${name}`);
  return data;
};

export const getCocktailById = async (cocktailId) => {
  const { data } = await instance.get(`drinks/${cocktailId}`);
  return data;
};

export const getIngredients = async () => {
  const { data } = await instance.get(`ingredients`);
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
