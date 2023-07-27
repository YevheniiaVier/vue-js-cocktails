import axios from "axios";
import store from "../store";

export const instance = axios.create({
  baseURL: "https://cocktails-backend.onrender.com/api/",
});

export const searchCocktailByName = async (name, page) => {
  const { data } = await instance.get(`drinks/search/${name}?page=${page}`);
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

export const updateCocktailInfo = async (id, drink, file) => {
  const formData = new FormData();
  for (const key in drink) {
    formData.append(key, drink[key]);
  }
  if(file) {
    formData.append("image", file);
  }
    const { data } = await instance.put(`drinks/drink/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};



export const removeDrink = async (cocktailId) => {
  const  drink  = await instance.delete(`drinks/drink/${cocktailId}`);
  return drink;
}

export const getCocktailById = async (cocktailId) => {
  const { data } = await instance.get(`drinks/drink/${cocktailId}`);
  return data;
};

export const getListOfIngredients = async () => {
  const { data } = await instance.get(`ingredients/list`);
  return data;
};


export const searchDrinksByFilter = async (filter, page, param) => {
  const { data } = await instance.get(`drinks/filter?${param}=${filter}&page=${page}`);
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

export const toggleFavoriteCocktail = async (drinkId) => {
  const { data } = await instance.post(`drinks/favorite/${drinkId}`);
  return data;
};


export const getMyCocktails = async () => {
  const { data } = await instance.get("drinks/my-drinks");
  return data;
};

export const getCocktailsByLetter = async (letter, page) => {
  const { data } = await instance.get(`drinks/list/${letter}?page=${page}`);
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
