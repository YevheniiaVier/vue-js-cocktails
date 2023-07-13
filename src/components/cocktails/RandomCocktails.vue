<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CocktailsList from "./CocktailsList.vue";
const store = useStore();

const randomCocktails = computed(() => {
  return store.getters["cocktails/getRandomCocktails"];
});

async function getCocktails() {
try {
  await store.dispatch("cocktails/getRandomCocktails");

  return randomCocktails;

} catch (error) {
  console.log(error)
}
}
await getCocktails();
</script>

<template>
  <section>
    <CocktailsList :cocktails="randomCocktails" />
  </section>
</template>
<style lang="scss" scoped></style>
