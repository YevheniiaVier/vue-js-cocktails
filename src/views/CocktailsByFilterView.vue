<template>
  <AppContainer>
    <GoBackButton @go-back="goBack" />
    <h2 class="title">{{ sectionTitle }}</h2>
    <CocktailsList
      :hasMoreData="hasMoreData"
      @updatePage="getNewDrinks"
      v-if="cocktails.length > 0"
      :cocktails="cocktails"
    />
    <p class="error__message" v-if="emptyResult">
      There are no drinks for filter "{{ filter }}", please try another one
    </p>
  </AppContainer>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, watch, ref } from 'vue';
import GoBackButton from '../components/shared/GoBackButton.vue';

import CocktailsList from '../components/cocktails/CocktailsList.vue';

import AppContainer from '../components/shared/AppContainer.vue';
import { searchDrinksByFilter } from '../services/cocktails-api';
const route = useRoute();
const router = useRouter();

const emptyResult = ref(false);
const hasMoreData = ref(true);

const cocktails = ref([]);
const titles = {
  t: 'Cocktails filtered by tag',
  i: 'Cocktails filtered by ingredient',
  c: 'Cocktails filtered by category',
  a: 'Cocktails filtered by type',
};

const sectionTitle = computed(() => {
  const filterToShow = filter.value === "Non_Alcoholic" ? "Non alcoholic" : filter.value;
  const titlePrefix = titles[filterParam.value] || '';
  return `${titlePrefix} "${filterToShow}"`;
});
const filter = computed(() => (route.params.filter ? route.params.filter : ''));
const filterParam = computed(() =>
  route.query.filter ? route.query.filter : ''
);
const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};



const setEmptyResult = () => {
  if (cocktails.value.length === 0) {
    emptyResult.value = true;
  } else {
    emptyResult.value = false;
  }
};

const getNewDrinks = async (page = 1) => {
  try {
    const { drinks } = await searchDrinksByFilter(
      filter.value,
      page,
      filterParam.value
    );

    if (drinks.length === 0) {
      hasMoreData.value = false;
    } else {
      hasMoreData.value = true;
    }
    cocktails.value.push(...drinks);
  } catch (error) {
    console.log(error);
  }
};

watch(filter, async () => {
  emptyResult.value = false;
  cocktails.value = [];
  await getNewDrinks();

  setEmptyResult();
});

onMounted(async () => {
  await getNewDrinks();
  setEmptyResult();

});
</script>

<style lang="scss" scoped>
@import '../assets/scss';
.title {
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
}
</style>
