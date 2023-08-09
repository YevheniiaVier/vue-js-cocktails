<template>
  <AppContainer>
    <AppSelect
      class="category-field"
      @select="onSelect('strCategory', $event)"
      id="strCategory"
      label="Category"
      :items="categorySelectItems"
      v-model="formData.category"
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
import CocktailsFilterForm from '@/components/cocktails/CocktailsFilterForm.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import AppSelect from '../components/shared/form/AppSelect.vue';

const route = useRoute();
const router = useRouter();

const hasMoreData = ref(true);
const loading = ref(false);
const emptySearch = ref(false);
const cocktails = ref([]);
const searchCategory = ref('');
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));



const formData = reactive({
  category: '',
});

const onSelect = async (field, value) => {
  formData[field] = value;
  cocktails.value = [];
  if (!value) {
    router.push({ query: { page: 1, c: '' } });
    return;
  }
  searchCategory.value = value;
  await router.push({ query: { page: 1, c: searchCategory.value } });
  await searchCocktails(searchCategory.value);
};
const categorySelectItems = ref([
  { value: '', label: 'Category', selected: true },
  { value: 'Ordinary Drink', label: 'Ordinary Drink', selected: false },
  { value: 'Cocktail', label: 'Cocktail', selected: false },
  { value: 'Shake', label: 'Shake', selected: false },
  { value: 'Other / Unknown', label: 'Other / Unknown', selected: false },
  { value: 'Cocoa', label: 'Cocoa', selected: false },
  { value: 'Shot', label: 'Shot', selected: false },
  { value: 'Coffee / Tea', label: 'Coffee / Tea', selected: false },
  { value: 'Homemade Liqueur', label: 'Homemade Liqueur', selected: false },
  {
    value: 'Punch / Party Drink',
    label: 'Punch / Party Drink',
    selected: false,
  },
  { value: 'Beer', label: 'Beer', selected: false },
  { value: 'Soft Drink', label: 'Soft Drink', selected: false },
]);

const searchCocktails = async category => {
  try {
    const { drinks } = await searchDrinksByFilter(category, page.value, 'c');
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
  await router.push({ query: { ...route.query, page: 1 }});
  console.log('page.value', page.value);
    (searchCategory.value = route.query.c ? route.query.c : '');
  if (searchCategory.value) {
    categorySelectItems.value.forEach(item => {
      return (item.selected = item.value === route.query.c);
    });
    await searchCocktails(searchCategory.value);
  }
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    searchCocktails(searchCategory.value);
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
