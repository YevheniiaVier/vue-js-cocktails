<template>
  <AppContainer>
    <AppLetters />

    <CocktailsList
      :hasMoreData="hasMoreData"
      @updatePage="getNewDrinks"
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
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, watch, ref } from 'vue';

import CocktailsList from '../components/cocktails/CocktailsList.vue';

import AppLetters from '../components/shared/AppLetters.vue';
import AppContainer from '../components/shared/AppContainer.vue';
import CircleLoader from '../components/loaders/CircleLoader.vue';
import { getCocktailsByLetter } from '../services/cocktails-api';
const route = useRoute();

const letterToDisplay = ref(route.params.letter);
const emptyResult = ref(false);
const hasMoreData = ref(true);

const cocktails = ref([]);
const letter = computed(() =>
  route.params.letter ? route.params.letter : 'A'
);

const setEmptyResult = () => {
  if (cocktails.value.length === 0) {
    emptyResult.value = true;
  } else {
    emptyResult.value = false;
  }
};

const getNewDrinks = async (page = 1) => {
  try {
    const { drinks } = await getCocktailsByLetter(letter.value, page);

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

watch(letter, async () => {
  emptyResult.value = false;
  cocktails.value = [];
  await getNewDrinks();
  letterToDisplay.value = letter;
  setEmptyResult();
});

onMounted(async () => {
  letterToDisplay.value = letter;
  await getNewDrinks();
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
