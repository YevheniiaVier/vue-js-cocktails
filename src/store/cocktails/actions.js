import * as api from "../../services/cocktails-api";
import * as ingApi from "../../services/ingredients-api";

export const searchCocktailsByName = async ({ commit }, {query, page}) => {
  const { drinks } = await api.searchCocktailByName(query, page);

  commit("setSearchedCocktails", drinks);
};

export const searchCocktailsByLetter = async ({ commit }, {letter, page}) => {
  const { drinks } = await api.getCocktailsByLetter(letter, page);
  commit("setCocktailsByLetter", drinks);
};

export const getRandomCocktails = async ({ commit }) => {
  const { drinks } = await api.getRandomCocktails();
  commit("setRandomCocktails", drinks);
};

// export const searchIngredients = async ({ commit }, keyword) => {
//   const { drinks } = await api.searchByIngredient(keyword);
//   commit("setIngredients", drinks);
// };


export const getListIngredients = async ({ commit }) => {
  const { ingredients } = await api.getListOfIngredients();
  commit("setIngredientsList", ingredients);
};



export const getAllIngredients = async ({ commit }) => {
  const { ingredients } = await ingApi.getAllOfIngredients();
  commit("setIngredients", ingredients);
};

export const getListTags = async ({ commit }) => {
  const { tagsValues } = await api.getListOfTags();
  commit("setTagsList", tagsValues);
};
