<template>
  <ul class="tags__list" v-if="props.tags">
    <li  class="tags__item" v-for="(tag, index) in tagsSplitted" :key="index">
      <RouterLink
      :to="getRouterLink(tag)"
     
      >{{ tag }}</RouterLink>
     
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  tags: {
    type: String,
  },
});


const tagsSplitted = computed(() => {
  return props.tags.split(',');
});
const getRouterLink = (tag) => {
  return {
    name: 'by-filter',
    params: {
      filter: tag,
   
    },
    query: {
      filter: 't',
    },
  };
};

</script>

<style lang="scss" scoped>
@import '../../assets/scss/';
.tags {

&__list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
margin-top: 16px;
}

&__item {
  padding: 5px;
  background-color: $main-color;
  border-radius: 5px;
}
}


</style>
