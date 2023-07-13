<template>
  <ul ref="scrollEl" class="cocktails__list">
    <CocktailItem
      :cocktail="cocktail"
      v-for="cocktail in props.cocktails"
      :key="cocktail._id"
    />
  </ul>
  <GoUpButton />
  <p v-if="showMessage" class="message">There are no more drinks</p>
</template>

<script setup>
import { watch, ref, defineProps, computed, onMounted, onUnmounted } from 'vue';
import CocktailItem from './CocktailItem.vue';
import { useRoute } from 'vue-router';
import GoUpButton from '../shared/GoUpButton.vue';

const scrollEl = ref(null);
const page = ref(1);
const emit = defineEmits(['updatePage']);
let isBottomReached = false;
const props = defineProps({
  cocktails: {
    required: true,
    type: Array,
  },
  hasMoreData: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
  },
});
onMounted(async () => {
  if (
    route.name === 'home' ||
    route.name === 'favorites' ||
    route.name === 'my-drinks'
  ) {
    return;
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(async () => {
  window.removeEventListener('scroll', handleScroll);
});
const handleScroll = e => {
  if (!props.hasMoreData) {
    return;
  }
  let element = scrollEl.value;
  if (
    !isBottomReached &&
    element.getBoundingClientRect().bottom < window.innerHeight
  ) {
    isBottomReached = true; // Set the flag to true once bottom is reached
    page.value += 1;
    emit('updatePage', page.value);
  } else if (
    isBottomReached &&
    element.getBoundingClientRect().bottom >= window.innerHeight
  ) {
    isBottomReached = false; // Reset the flag when scrolling back up
  }
};
const route = useRoute();

const showMessage = computed(() => {
  if (props.hasOwnProperty('hasMoreData')) {
    return !props.hasMoreData;
  }
});
</script>

<style lang="scss" scoped>
.cocktails {
  &__list {
    position: relative;
    margin-top: 25px;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 25px; */
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    align-items: center;
  }
}
.message {
  text-align: center;
  font-size: 25px;
  margin-top: 30px;
}
</style>
