<template>
  <p>
    Category:
    <RouterLink :to="getRouterLink(category)">{{ category }}</RouterLink>
  </p>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const getRouterLink = category => {
  return {
    name: 'by-filter',
    params: {
      filter: category,
    },
    query: {
      filter: 'c',
    },
  };
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/';
</style>
