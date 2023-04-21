<template>
  <AppContainer>
    <h1 class="title">Find your cocktail here</h1>
    <CocktailsFilterForm @onSelect="onSelect" @submit="handleSearch" />
    <p v-if="emptySearch">No results for your search</p>
    <CocktailsList v-else :cocktails="filteredCocktails || []" />
  </AppContainer>
</template>
<script setup>
import { ref, reactive, watch, computed } from "vue";

import CocktailsList from "@/components/cocktails/CocktailsList.vue";
import { searchCocktailByName } from "@/services/cocktails-api";
import CocktailsFilterForm from "@/components/cocktails/CocktailsFilterForm.vue";
import AppContainer from "@/components/shared/AppContainer.vue";

const cocktails = reactive([]);

const keyword = ref("");

const categoryFilter = ref("");
const emptySearch = ref(false);

const handleSearch = (data) => {
  keyword.value = data.inputValue;
  if (!keyword.value) {
    return alert(" please enter something");
  }
  if (keyword.value) {
    searchCocktails(keyword.value);
  }
};
const onSelect = (category) => {
  categoryFilter.value = category;
};

function filterByCategory(value) {
  // if (!cocktails.value) {
  //   return alert("please make you search first");
  // }

  if (value !== "Non alcoholic" && value !== "Alcoholic") {
    return cocktails.value;
  }
  const cocktailsByCategory = cocktails.value.filter(
    (cocktail) => cocktail.strAlcoholic === value
  );
  if (!cocktailsByCategory.length) {
    return;
  }
  return cocktailsByCategory;
}

async function searchCocktails(query) {
  const { drinks } = await searchCocktailByName(query);
  if (!drinks) {
    console.log("no drinks");
    emptySearch.value = true;
    return;
  }

  emptySearch.value = false;
  cocktails.value = [...drinks];
  console.log(cocktails.value);

  return cocktails.value;
}
const filteredCocktails = computed(() => {
  return filterByCategory(categoryFilter.value);
});
</script>
<style lang="scss" scoped>
.title {
  color: white;
}
</style>
