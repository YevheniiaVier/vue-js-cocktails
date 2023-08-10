<template>
  <AppContainer>
    <AppSelect
      class="tag-field"
      @select="onSelect('tag', $event)"
      id="tag"
      label="Tag"
      :items="tagSelectItems"
      v-model="formData.tag"
    />
    <CocktailsList
      :hasMoreData="hasMoreData"
      :loading="loading"
      :cocktails="cocktails || []"
    />
  </AppContainer>
</template>
<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { searchDrinksByFilter } from '../services/cocktails-api';
import CocktailsList from '@/components/cocktails/CocktailsList.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import AppSelect from '../components/shared/form/AppSelect.vue';

const route = useRoute();
const router = useRouter();

const hasMoreData = ref(true);
const loading = ref(false);
const cocktails = ref([]);
const searchTag = ref('');
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const formData = reactive({
  tag: '',
});

const onSelect = async (field, value) => {
  formData[field] = value;
  cocktails.value = [];
  if (!value) {
    router.push({ query: { page: 1, t: '' } });
    return;
  }
  searchTag.value = value;
  await router.push({ query: { page: 1, t: searchTag.value } });
  await searchCocktails(searchTag.value);
};
const tagSelectItems = ref([
  { value: '', label: 'Tag', selected: true },
  { value: 'IBA', label: 'IBA', selected: false },
  { value: 'NewEra', label: 'NewEra', selected: false },
  { value: 'Classic', label: 'Classic', selected: false },
  { value: 'Beach', label: 'Beach', selected: false },
  {
    value: 'ContemporaryClassic',
    label: 'ContemporaryClassic',
    selected: false,
  },
  { value: 'Alcoholic', label: 'Alcoholic', selected: false },
  { value: 'Holiday', label: 'Holiday', selected: false },
  { value: 'Clear', label: 'Clear', selected: false },
  { value: 'Sour', label: 'Sour', selected: false },
  { value: 'Dairy', label: 'Dairy', selected: false },
  { value: 'simple', label: 'simple', selected: false },
  { value: 'classic', label: 'classic', selected: false },
  { value: 'refreshing', label: 'refreshing', selected: false },
  { value: 'Sweet', label: 'Sweet', selected: false },
  { value: 'Brazilian', label: 'Brazilian', selected: false },
  { value: 'Cold', label: 'Cold', selected: false },
  { value: 'Frozen', label: 'Frozen', selected: false },
  { value: 'Summer', label: 'Summer', selected: false },
  { value: 'DateNight', label: 'DateNight', selected: false },
  { value: 'USA', label: 'USA', selected: false },
  { value: 'Winter', label: 'Winter', selected: false },
  { value: 'Drunk', label: 'Drunk', selected: false },
  { value: 'DinnerParty', label: 'DinnerParty', selected: false },
  { value: 'StrongFlavor', label: 'StrongFlavor', selected: false },
  { value: 'Christmas', label: 'Christmas', selected: false },
  { value: 'Citrus', label: 'Citrus', selected: false },
  { value: 'Halloween', label: 'Halloween', selected: false },
  { value: 'Lazy', label: 'Lazy', selected: false },
  { value: 'Sharp', label: 'Sharp', selected: false },
  { value: 'German', label: 'German', selected: false },
  { value: 'Passion', label: 'Passion', selected: false },
  { value: 'Fresh', label: 'Fresh', selected: false },
  { value: 'Refreshing', label: 'Refreshing', selected: false },
  { value: 'Hangover', label: 'Hangover', selected: false },
  { value: 'Breakfast', label: 'Breakfast', selected: false },
  { value: 'Adult', label: 'Adult', selected: false },
  { value: 'Shot', label: 'Shot', selected: false },
  { value: 'Bubbly', label: 'Bubbly', selected: false },
  { value: 'Expensive', label: 'Expensive', selected: false },
  { value: 'Savory', label: 'Savory', selected: false },
  { value: 'Green', label: 'Green', selected: false },
  { value: 'Asia', label: 'Asia', selected: false },
  { value: 'Vegan', label: 'Vegan', selected: false },
  { value: 'Brunch', label: 'Brunch', selected: false },
  { value: 'Mild', label: 'Mild', selected: false },
  { value: 'Colourful', label: 'Colourful', selected: false },
  { value: 'Nature', label: 'Nature', selected: false },
  { value: 'Strong', label: 'Strong', selected: false },
  { value: 'Vegetarian', label: 'Vegetarian', selected: false },
  { value: 'Fruity', label: 'Fruity', selected: false },
  { value: 'Dark', label: 'Dark', selected: false },
  { value: 'Spanish', label: 'Spanish', selected: false },
  { value: 'Contemporary', label: 'Contemporary', selected: false },
  { value: 'Modern', label: 'Modern', selected: false },
]);

const searchCocktails = async category => {
  try {
    const { drinks } = await searchDrinksByFilter(category, page.value, 't');
    if (drinks.length <= 9) {
      hasMoreData.value = false;
    } else {
      hasMoreData.value = true;
    }
    cocktails.value.push(...drinks);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  cocktails.value = [];
  await router.push({ query: { ...route.query, page: 1 } });
  searchTag.value = route.query.t ? route.query.t : '';
  if (searchTag.value) {
    tagSelectItems.value.forEach(item => {
      return (item.selected = item.value === route.query.t);
    });
    await searchCocktails(searchTag.value);
  }
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    searchCocktails(searchTag.value);
  }
);
</script>
<style lang="scss" scoped>
.title {
  color: white;
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
}
</style>
