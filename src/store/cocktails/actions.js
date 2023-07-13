import * as api from "../../services/cocktails-api";

export const searchCocktailsByName = async ({ commit }, keyword) => {
  const { drinks } = await api.searchCocktailByName(keyword);
  commit("setSearchedCocktails", drinks);
};

export const searchCocktailsByLetter = async ({ commit }, {letter, page}) => {
  console.log('letter', letter);
  console.log('page', page)
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

export const getAllIngredients = async ({ commit }) => {
  const { ingredients } = await api.getAllIngredients();
  commit("setIngredients", ingredients);
};
export const getListIngredients = async ({ commit }) => {
  const { ingredients } = await api.getListOfIngredients();
  commit("setIngredientsList", ingredients);
};

// export const deleteCocktail = async ({ commit }, payload) => {
//   const  drink  = await api.removeDrink(payload);
//   commit("setIngredientsList", ingredients);
// };