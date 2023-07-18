<template>
  <AppContainer>
    <h1 class="title">Random Cocktails</h1>
    <Suspense>
      <RandomCocktails />
      <template #fallback>

        <CircleLoader />

      </template>
    </Suspense>
    <AppLetters />
  </AppContainer>
</template>

<script setup>
import { ref, onErrorCaptured, Suspense } from "vue";

import CircleLoader from "../components/loaders/CircleLoader.vue";
import RandomCocktails from "../components/cocktails/RandomCocktails.vue";
import AppContainer from "@/components/shared/AppContainer.vue";
import AppLetters from '../components/shared/AppLetters.vue';
const error = ref(null);

onErrorCaptured(() => {
  error.value = "Sorry, something went wrong...";
});
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: white;
}
</style>
