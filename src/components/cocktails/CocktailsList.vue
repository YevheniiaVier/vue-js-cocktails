<template>
  <ul class="cocktails__list">
    <CocktailItem
      :cocktail="cocktail"
      v-for="cocktail in props.cocktails"
      :key="cocktail.idDrink"
    />
  </ul>
</template>

<script setup>
import CocktailItem from "./CocktailItem.vue";

const props = defineProps({
  cocktails: {
    required: true,
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.cocktails {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 25px;
  }
}
</style>
