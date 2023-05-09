<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CocktailsList from "./CocktailsList.vue";
const store = useStore();

const searchedCocktails = computed(() => {
  return store.getters["cocktails/getSearchedCocktails"];
});

async function getCocktails() {
  await store.dispatch("cocktails/getRandomCocktails");
  return searchedCocktails;
}
await getCocktails();
</script>
<template>
  <section>
    <CocktailsList :cocktails="searchedCocktails" />
  </section>
</template>
<style lang="scss" scoped></style>
