<template>
  <AppContainer>
    <AppLetters />

    <CocktailsList :cocktails="cocktails" />
  </AppContainer>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import CocktailsList from '../components/cocktails/CocktailsList.vue';
import AppLetters from '../components/shared/AppLetters.vue';
import AppContainer from '../components/shared/AppContainer.vue';

const store = useStore();
const route = useRoute();

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const cocktails = computed(() => {
  return store.getters['cocktails/getCocktailsByLetter'];
});
watch(route, async () => {
  const letter = route.params.letter;
  try {
    await store.dispatch('cocktails/searchCocktailsByLetter', letter);
  } catch (error) {
    console.log(error);
  }
});

onMounted(async () => {
  const letter = route.params.letter ? route.params.letter : 'A';
  
  try {
    await store.dispatch('cocktails/searchCocktailsByLetter', letter);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped></style>
