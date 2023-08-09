<template>
  <AppContainer>
    <CocktailsFilterForm :loading="loading" @onSelect="onSelect" />
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
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import { searchDrinksByFilter } from '../services/cocktails-api';
import CocktailsList from '@/components/cocktails/CocktailsList.vue';
import CocktailsFilterForm from '@/components/cocktails/CocktailsFilterForm.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import 'vue-toast-notification/dist/theme-sugar.css';

const route = useRoute();
const router = useRouter();

const hasMoreData = ref(true);
const loading = ref(false);
const emptySearch = ref(false);
const cocktails = ref([]);

const searchCategory = ref('');
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const onSelect = async category => {
  cocktails.value = [];
  if (!category) {
    router.push({ query: { page: 1, a: '' } });
    return;
  }

  searchCategory.value =
    category === 'Non alcoholic' ? 'Non_Alcoholic' : 'Alcoholic';
  await router.push({ query: { page: 1, a: searchCategory.value } });
  await searchCocktails(searchCategory.value);
};

const searchCocktails = async category => {
  try {
    const { drinks } = await searchDrinksByFilter(category, page.value, 'a');
    if (drinks.length <= 9) {
      hasMoreData.value = false;
    } else {
      hasMoreData.value = true;
    }
    cocktails.value.push(...drinks);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  searchCategory.value = route.query.a ? route.query.a : '';
  if (searchCategory.value) {
    searchCocktails(searchCategory.value);
  }
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    searchCocktails(searchCategory.value);
  }
);

</script>
<style lang="scss" scoped>
.title {
  color: white;
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
}
</style>
