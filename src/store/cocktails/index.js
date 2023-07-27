import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const initialState = {
  searchedCocktails: [],
  randomCocktails: [],
  cocktailsByLetter: [],
  // cocktailsByIngredient: [],
  ingredients: [],
  ingredientsList:[],
  tagsList:[],
};

export default {
  namespaced: true,
  state: { ...initialState },
  actions,
  getters,
  mutations,
};
