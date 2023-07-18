<template>
  <AppContainer>
    <h1 class="title">Find your cocktail here</h1>
    <CocktailsFilterForm
      :loading="loading"
      @onSelect="onSelect"
      @submit="handleSearch"
    />
    <!-- <p v-if="emptySearch">No results for your search</p> -->
    <CocktailsList
      :hasMoreData="hasMoreData"
      @updatePage="changePage"
      :loading="loading"
      
      :cocktails="cocktails || []"
    />
    <AppLetters />
  </AppContainer>
</template>
<script setup>
import { ref, computed, watch } from 'vue';

import { useStore } from 'vuex';
const store = useStore();

import CocktailsList from '@/components/cocktails/CocktailsList.vue';
import CocktailsFilterForm from '@/components/cocktails/CocktailsFilterForm.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import AppLetters from '../components/shared/AppLetters.vue';
const hasMoreData = ref(true);
const searchedCocktails = computed(() => {
  return store.getters['cocktails/getSearchedCocktails'];
});
const $toast = useToast();

const filteredCocktails = computed(() => {
  return store.getters['cocktails/getFilteredCocktails'];
});

const keyword = ref('');
const loading = ref(false);
const emptySearch = ref(false);
const cocktails = ref([]);
const page = ref(1);

const handleSearch = data => {
  keyword.value = data.inputValue;
  if (!keyword.value) {
    $toast.open({
      message: 'Please enter something',
      type: 'warning',
      position: 'top-right',
    });
  }
  if (keyword.value) {
    searchCocktails(keyword.value, page.value);
  }
};
const onSelect = async category => {
  cocktails.value = [];
  await store.dispatch('filter/setFilter', category);
};

const changePage = p => {
  page.value = p;
  searchCocktails(keyword.value, page.value);
};

async function searchCocktails(query, page = 1) {
  try {
    loading.value = true;
    await store.dispatch('cocktails/searchCocktailsByName', { query, page });
    
    if (searchedCocktails.value.length === 0) {

      emptySearch.value = true;
      hasMoreData.value = false;

      
      return;
    } else {
      hasMoreData.value = true;
    }
    cocktails.value = [...cocktails.value, ...filteredCocktails.value];
  } catch (error) {
    console.log(error);
    $toast.open({
      message: error,
      type: 'error',
      position: 'top-right',
    });
  } finally {
    loading.value = false;
  }

  emptySearch.value = false;
  return searchedCocktails;
}
watch(keyword, () => {
  cocktails.value = [];
  page.value = 1;
  emptySearch.value = false;
  hasMoreData.value = true;
});

</script>
<style lang="scss" scoped>
.title {
  color: white;
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
}
</style>
