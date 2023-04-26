export function setSearchedCocktails(state, data) {
  if (!data) {
    state.searchedCocktails = [];
  } else {
    state.searchedCocktails = [...data];
  }
}

export function setCocktailsByLetter(state, data) {
  state.cocktailsByLetter = [...data];
}

export function setCocktailsByIngredient(state, data) {
  state.cocktailsByIngredient = [...data];
}
export function setIngredients(state, data) {
  state.ingredients = [...data];
}
