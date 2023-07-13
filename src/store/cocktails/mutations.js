export function setSearchedCocktails(state, data) {
  if (!data) {
    state.searchedCocktails = [];
  } else {
    state.searchedCocktails = [...data];
  }
}

export function setRandomCocktails(state, data) {
  if (!data) {
    state.randomCocktails = [];
  } else {
    state.randomCocktails = [...data];
  }
}

export function setCocktailsByLetter(state, drinks) {
  state.cocktailsByLetter = [...drinks];
}

// export function setCocktailsByIngredient(state, data) {
//   state.searchedCocktails = [...data];
// }
export function setIngredients(state, data) {
  state.ingredients = [...data];
}
export function setIngredientsList(state, data) {
  state.ingredientsList = [...data];
}
