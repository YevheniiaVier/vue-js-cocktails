import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
});

export const searchCocktailByName = async (name) => {
  const { data } = await instance.get(`/search.php?s=${name}`);
  return data;
};

export const getCocktailById = async (cocktailId) => {
  const { data } = await instance.get(`lookup.php?i=${cocktailId}`);
  return data;
};

export const getIngredients = async () => {
  const { data } = await instance.get(`list.php?i=list`);
  return data;
};

export const searchByIngredient = async (ingredient) => {
  const { data } = await instance.get(`filter.php?i=${ingredient}`);
  return data;
};

export const getRandomCocktail = async () => {
  const { data } = await instance.get("random.php");
  return data;
};

export const getCocktailsByLetter = async (letter) => {
  const { data } = await instance.get(`search.php?f=${letter}`);
  return data;
};
