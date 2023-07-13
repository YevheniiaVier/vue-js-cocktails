<template>
  <AppContainer>
    <h1 class="title">Find your cocktail here</h1>
    <CocktailsFilterForm
      :loading="loading"
      @onSelect="onSelect"
      @submit="handleSearch"
    />
    <p v-if="emptySearch">No results for your search</p>
    <CocktailsList
      :loading="loading"
      v-else
      :cocktails="filteredCocktails || []"
    />
  <AppLetters/>

  </AppContainer>
  
</template>
<script setup>
import { ref, computed } from "vue";

import { useStore } from "vuex";
const store = useStore();

import CocktailsList from "@/components/cocktails/CocktailsList.vue";
import CocktailsFilterForm from "@/components/cocktails/CocktailsFilterForm.vue";
import AppContainer from "@/components/shared/AppContainer.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import AppLetters from '../components/shared/AppLetters.vue';

const searchedCocktails = computed(() => {
  return store.getters["cocktails/getSearchedCocktails"];
});
const $toast = useToast();

const filteredCocktails = computed(() => {
  return store.getters["cocktails/getFilteredCocktails"];
});

const keyword = ref("");
const loading = ref(false);
const emptySearch = ref(false);

const handleSearch = (data) => {
  keyword.value = data.inputValue;
  if (!keyword.value) {
    $toast.open({
      message: "Please enter something",
      type: "warning",
      position: "top-right",
    });
  }
  if (keyword.value) {
    searchCocktails(keyword.value);
  }
};
const onSelect = async (category) => {
  await store.dispatch("filter/setFilter", category);
};

async function searchCocktails(query) {
  try {
    loading.value = true;
    await store.dispatch("cocktails/searchCocktailsByName", query);
  } catch (error) {
    console.log(error);
    $toast.open({
      message: error,
      type: "error",
      position: "top-right",
    });
  } finally {
    loading.value = false;
  }

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
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
}
</style>
