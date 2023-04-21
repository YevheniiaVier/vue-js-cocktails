<template>
  <AppContainer>
    <h1 class="title">Random Cocktails</h1>
    <CocktailsList :cocktails="cocktails" />
  </AppContainer>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { computed } from "@vue/reactivity";
import { getRandomCocktail } from "@/services/cocktails-api";
import CocktailsList from "@/components/cocktails/CocktailsList.vue";
// import CocktailsFilterForm from "@/components/cocktails/CocktailsFilterForm.vue";
import AppContainer from "@/components/shared/AppContainer.vue";

const cocktails = ref([]);
// const categoryFilter = ref("");
// const nameFilter = ref("");

// const handleFilter = (data) => {
//   categoryFilter.value = data.category;
//   nameFilter.value = data.inputValue;
// };

// const filteredCocktails = computed(() => filterByName(cocktails.value));

// const filterByCategory = (category) => {
//   if (!categoryFilter.value) {
//     console.log("empty");
//     return cocktails.value;
//   }
//   return cocktails.value.filter(
//     (cocktail) => cocktail.strAlcoholic === category
//   );
// };

// const filterByName = (keyword) => {
//   if (!nameFilter.value) return cocktails.value;
//   return cocktails.value.filter((cocktail) =>
//     cocktail.strDrink.includes(keyword)
//   );
// };
onMounted(async () => {
  for (let i = 0; i < 15; i++) {
    const result = await getRandomCocktail();
    cocktails.value.push(result.drinks[0]);
  }
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
