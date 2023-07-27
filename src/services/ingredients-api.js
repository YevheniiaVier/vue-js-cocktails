import {instance} from "./cocktails-api";
import store from "../store";

export const searchIngredientByName = async (name, page) => {
  const { data } = await instance.get(`ingredients/search/${name}?page=${page}`);
  return data;
};

export const addIngredient = async (ingredient, file) => {
  const formData = new FormData();
  for (const key in ingredient) {
    formData.append(key, ingredient[key]);
  }
  formData.append("image", file);
  const { data } = await instance.post(`ingredients`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateIngredientInfo = async (id, ingredient, file) => {
  const formData = new FormData();
  for (const key in ingredient) {
    formData.append(key, ingredient[key]);
  }
  if(file) {
    formData.append("image", file);
  }
    const { data } = await instance.put(`ingredients/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateIngredientImg = async (id, file) => {
    const formData = new FormData();
    if(file) {
      formData.append("image", file);
    }
      const { data } = await instance.patch(`ingredients/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  };

export const removeIngredient = async (ingredientId) => {
  const  drink  = await instance.delete(`ingredients/${ingredientId}`);
  return drink;
}


export const getListOfIngredients = async () => {
  const { data } = await instance.get(`ingredients/list`);
  return data;
};
export const getAllOfIngredients = async () => {
  const { data } = await instance.get(`ingredients`);
  return data;
};

export const searchDrinksByFilter = async (filter, page, param) => {
  const { data } = await instance.get(`drinks/filter?${param}=${filter}&page=${page}`);
  return data;
};

export const getMyIngredients = async () => {
  const { data } = await instance.get("ingredients/my-ingredients");
  return data;
};



export const getIngredientById = async (ingredient) => {
  const { data } = await instance.get(`ingredients/${ingredient}`);
  return data;
};

