// import store from '../../store'

export const getSearchedCocktails = ({ searchedCocktails }) => {
  return searchedCocktails;
};

export const getFilteredCocktails = (
  { searchedCocktails },
  getters,
  rootState
) => {
  const filter = rootState.filter.filter;
  if (filter) {
    const filteredCocktails = searchedCocktails.filter(
      (cocktail) => cocktail.strAlcoholic === filter
    );

    return filteredCocktails;
  }

  return searchedCocktails;
};

// export const getCocktailsByLetter = ({ cocktailsByLetter }) => {
//   return cocktailsByLetter;
// };
// export const getCocktailsByIngredient = ({ cocktailsByIngredient }) => {
//   return cocktailsByIngredient;
// };

export const getIngredients = ({ ingredients }) => {
  return ingredients;
};

export const getIngredientsList = ({ ingredientsList }) => {
  return ingredientsList;
};
