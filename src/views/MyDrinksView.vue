<template>
  <AppContainer>
    <CircleLoader v-if="isLoading" />
    <CocktailsList v-else :cocktails="cocktails" />
  </AppContainer>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import CircleLoader from '../components/loaders/CircleLoader.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import CocktailsList from '../components/cocktails/CocktailsList.vue';
import { getMyCocktails } from '../services/cocktails-api';
const cocktails = ref([]);
const isLoading = ref(false);
onMounted(async () => {
  try {
    isLoading.value = true;
    const { drinks } = await getMyCocktails();
    cocktails.value = drinks;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
