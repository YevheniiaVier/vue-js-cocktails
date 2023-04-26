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
// import { useToast } from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();

import CocktailsList from "@/components/cocktails/CocktailsList.vue";
import CocktailsFilterForm from "@/components/cocktails/CocktailsFilterForm.vue";
import AppContainer from "@/components/shared/AppContainer.vue";

const searchedCocktails = computed(() => {
  return store.getters["cocktails/getSearchedCocktails"];
});

const filteredCocktails = computed(() => {
  return store.getters["cocktails/getFilteredCocktails"];
});

const keyword = ref("");

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
const onSelect = async (category) => {
  await store.dispatch("filter/setFilter", category);
};

async function searchCocktails(query) {
  await store.dispatch("cocktails/searchCocktailsByName", query);
  console.log(searchedCocktails.value);
  if (!searchedCocktails.value.length) {
    emptySearch.value = true;
    return;
  }
  emptySearch.value = false;
  return searchedCocktails;
}
</script>
<style lang="scss" scoped>
.title {
  color: white;
}
</style>
