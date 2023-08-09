<template>
  <ul ref="scrollEl" class="cocktails__list">
    <CocktailItem
      :cocktail="cocktail"
      v-for="cocktail in props.cocktails"
      :key="cocktail._id"
    />
  </ul>
  <GoUpButton v-if="props.cocktails.length > 1" />
  <p v-if="!hasMoreData" class="message">There are no more drinks</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import CocktailItem from './CocktailItem.vue';
import { useRoute, useRouter } from 'vue-router';
import GoUpButton from '../shared/GoUpButton.vue';

const scrollEl = ref(null);

const route = useRoute();
const router = useRouter();

let isBottomReached = false;
const queryPage = computed(() => (route.query.page ? Number(route.query.page) : 1));
const keyword = computed(() => (route.query.k ? route.query.k : ''));

const page = ref(1);
const props = defineProps({
  cocktails: {
    required: true,
    type: Array,
  },

  hasMoreData: {
    type: Boolean,
    default: true,
  },
  emptySearch: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
  },

});

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  page.value = queryPage.value || 1;
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
    isBottomReached = true;
    page.value += 1;
    router.push({ query: { ...route.query, page: page.value } });

  } else if (
    isBottomReached &&
    element.getBoundingClientRect().bottom >= window.innerHeight
  ) {
    isBottomReached = false;
  }
};

watch(
  () => keyword.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
    router.push({ query: { ...route.query, page: 1 } });
    page.value = 1; 

    }
  }
);
</script>

<style lang="scss" scoped>
.cocktails {
  &__list {
    position: relative;
    margin-top: 25px;

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
