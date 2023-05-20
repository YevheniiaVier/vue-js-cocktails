<template>
  <ul ref="ref" class="cocktails__list">
    <CocktailItem
      :cocktail="cocktail"
      v-for="cocktail in props.cocktails"
      :key="cocktail._id"
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
  ref: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.cocktails {
  &__list {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 25px;
    justify-items: center;
    place-items: center;
  }
}
</style>
