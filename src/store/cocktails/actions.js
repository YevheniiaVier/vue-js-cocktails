import * as api from "../../services/cocktails-api";

export const searchCocktailsByName = async ({ commit }, keyword) => {
  const { drinks } = await api.searchCocktailByName(keyword);
  commit("setSearchedCocktails", drinks);
};

export const searchCocktailsByLetter = async ({ commit }, letter) => {
  const { drinks } = await api.getCocktailsByLetter(letter);
  commit("setCocktailsByLetter", drinks);
};

export const getRandomCocktails = async ({ commit }) => {
  const { drinks } = await api.getRandomCocktails();
  commit("setSearchedCocktails", drinks);
};

// export const searchIngredients = async ({ commit }, keyword) => {
//   const { drinks } = await api.searchByIngredient(keyword);
//   commit("setIngredients", drinks);
// };
