import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const initialState = {
  searchedCocktails: [],
  cocktailsByLetter: [],
  // cocktailsByIngredient: [],
  ingredients: [],
  ingredientsList:[],
};

export default {
  namespaced: true,
  state: { ...initialState },
  actions,
  getters,
  mutations,
};
