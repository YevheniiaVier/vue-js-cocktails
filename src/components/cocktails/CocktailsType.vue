<template>
  <p>
    Type:
    <RouterLink :to="getRouterLink(typeOfDrink)">{{ drinkType }}</RouterLink>
  </p>
</template>

<script setup>
import { computed } from 'vue';

const typeOfDrink = computed(() =>
  props.drinkType === 'Non alcoholic' ? 'Non_Alcoholic' : 'Alcoholic'
);

const props = defineProps({
  drinkType: {
    type: String,
    required: true,
  },
});

const getRouterLink = type => {
  return {
    name: 'by-filter',
    params: {
      filter: type,
    },
    query: {
      filter: 'a',
    },
  };
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/';
</style>
