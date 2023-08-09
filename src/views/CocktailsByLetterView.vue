<template>
  <AppContainer>
    <AppLetters />

    <CocktailsList
      :hasMoreData="hasMoreData"
      v-if="cocktails.length > 0"
      :cocktails="cocktails"
    />
    <p class="error__message" v-if="emptyResult">
      There are no drinks for letter {{ letterToDisplay }}, please try another
      one
    </p>
  </AppContainer>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, computed, watch, ref } from 'vue';

import CocktailsList from '../components/cocktails/CocktailsList.vue';

import AppLetters from '../components/shared/AppLetters.vue';
import AppContainer from '../components/shared/AppContainer.vue';
import { getCocktailsByLetter } from '../services/cocktails-api';
const route = useRoute();

const letterToDisplay = ref(route.params.letter);
const emptyResult = ref(false);
const hasMoreData = ref(true);

const cocktails = ref([]);
const letter = computed(() =>
  route.params.letter ? route.params.letter : 'A'
);
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const setEmptyResult = () => {
  if (cocktails.value.length === 0) {
    emptyResult.value = true;
  } else {
    emptyResult.value = false;
  }
};

const searchCocktails = async () => {
  try {
    const { drinks } = await getCocktailsByLetter(letter.value, page.value);
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

watch(letter, async () => {
  emptyResult.value = false;
  cocktails.value = [];
  await searchCocktails();
  letterToDisplay.value = letter;
  setEmptyResult();
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    searchCocktails();
  }
);

onMounted(async () => {
  letterToDisplay.value = letter;
  await searchCocktails();
  setEmptyResult();
});
</script>

<style lang="scss" scoped>
@import '../assets/scss';

.error__message {
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
}
</style>
