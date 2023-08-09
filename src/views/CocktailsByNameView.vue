<template>
  <AppContainer>
    <h1 class="title">Find your cocktail here</h1>
    <CocktailsFilterForm :loading="loading" @submit="handleSearch" />
    <p v-if="emptySearch">No results for your search</p>
    <CocktailsList
      :hasMoreData="hasMoreData"
      :loading="loading"
      :cocktails="cocktails || []"
    />
  </AppContainer>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CocktailsList from '@/components/cocktails/CocktailsList.vue';
import CocktailsFilterForm from '@/components/cocktails/CocktailsFilterForm.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = useStore();
const route = useRoute();

const hasMoreData = ref(true);

const searchedCocktails = computed(() => {
  return store.getters['cocktails/getSearchedCocktails'];
});
const $toast = useToast();

const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const keyword = ref('');
const loading = ref(false);
const emptySearch = ref(false);
const cocktails = ref([]);
const queryKeyword = computed(() => (route.query.k ? route.query.k : ''));

const router = useRouter();

onMounted(async () => {
  if (queryKeyword.value !== '') {
    keyword.value = queryKeyword.value;
    searchCocktails(queryKeyword.value, page.value);

  }
});

const handleSearch = data => {
  const newKeyword = data.inputValue;
  if (newKeyword === keyword.value) {
    return;
  }
  keyword.value = newKeyword;
  if (!keyword.value) {
    $toast.open({
      message: 'Please enter something',
      type: 'warning',
      position: 'top-right',
    });
  }
  if (keyword.value) {
    searchCocktails(keyword.value, page.value);
    router.push({ query: { k: keyword.value } });
  }
};

async function searchCocktails(query, page = 1) {
  try {
    loading.value = true;
    await store.dispatch('cocktails/searchCocktailsByName', { query, page });
    emptySearch.value = false;
    if (searchedCocktails.value.length === 0) {
      console.log('searchedCocktails.value.length', searchedCocktails.value.length)

      emptySearch.value = true;
      console.log('emptySearch', emptySearch.value)
      return;
    }

    if (searchedCocktails.value.length <= 9) {
      hasMoreData.value = false;
    } else {
      hasMoreData.value = true;
    }
    cocktails.value = [...cocktails.value, ...searchedCocktails.value];
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

  return;
}

watch(keyword, () => {
  cocktails.value = [];
  emptySearch.value = false;
  hasMoreData.value = true;
});

watch(page, () => {
  searchCocktails(keyword.value, page.value);
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
