<template>
  <AppContainer>
    <div class="search__wrapper">
      <input
        class="search__input"
        @input="onIngredientInput"
        @keydown.enter="onPressEnter"
        id="ingredient"
        placeholder="Choose ingredient"
        label="Choose ingredient"
        v-model="formData.ingredient"
        :items="ingredients"
      />
      <ul v-if="filteredIngredients.length" class="ingredients__list">
        <li
          @click="onIngredientSelect(ingredient.strIngredient)"
          class="ingredient__item"
          v-for="ingredient in filteredIngredients"
          :key="ingredient._id"
        >
          {{ ingredient.strIngredient }}
        </li>
      </ul>
    </div>
      <CocktailsList
        v-if="!emptySearch"
        :hasMoreData="hasMoreData"
        :loading="loading"
        :cocktails="cocktails || []"
      />
      <p class="empty__message" v-else>No cocktails with this ingredient. Please try another one</p>
   
  </AppContainer>
</template>
<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { searchDrinksByFilter } from '../services/cocktails-api';
import CocktailsList from '@/components/cocktails/CocktailsList.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useStore } from 'vuex';
const store = useStore();

const ingredients = computed(() => {
  return store.getters['cocktails/getIngredients'];
});
const filteredIngredients = ref([]);
const route = useRoute();
const router = useRouter();
const ingredientToSearch = ref('');
const hasMoreData = ref(true);
const loading = ref(false);
const cocktails = ref([]);
const searchIngredient = ref('');
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));
const emptySearch = ref(false);
const formData = reactive({
  ingredient: '',
});

const onIngredientInput = () => {
  ingredientToSearch.value = formData.ingredient.trim().toLowerCase();
  if (!ingredientToSearch.value) {
    return;
  }
  filteredIngredients.value = ingredients.value.filter(ingredient =>
    ingredient.strIngredient.toLowerCase().includes(ingredientToSearch.value)
  );
};
const onPressEnter = () => {
  console.log('pressingthe enter button')
  cocktails.value = [];
  filteredIngredients.value = [];
  hasMoreData.value = true;
  searchCocktails(formData.ingredient);
};

const onIngredientSelect = async ingredient => {
  if (!ingredient) {
    return;
  }
  cocktails.value = [];
  filteredIngredients.value = [];
  hasMoreData.value = true;
  formData.ingredient = ingredient;
  await router.push({ query: { page: 1, i: ingredient } });
  searchCocktails(ingredient);
};

const searchCocktails = async ingredient => {
  emptySearch.value = false;
  hasMoreData.value = true;
  try {
    const { drinks, totalCount } = await searchDrinksByFilter(
      ingredient,
      page.value,
      'i'
    );
    if (page.value === 1 && totalCount === 0) {
      emptySearch.value = true;
      return;
    }
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
  filteredIngredients.value = [];
  searchIngredient.value = '';
  hasMoreData.value = true;
  ingredientToSearch.value = '';
  emptySearch.value = false;
  await router.push({ query: { ...route.query, i: '', page: 1 } });
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    searchCocktails(ingredientToSearch.value);
  }
);
watch(
  () => ingredientToSearch.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      router.push({ query: { ...route.query, page: 1 } });
    }
  }
);
</script>
<style lang="scss" scoped>
@import '../assets/scss/';
.search__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

}

.search__input {
  width: 500px;
  padding: 10px;
  border: 2px solid $accent-color;
  border-radius: 5px;
  font-size: 16px;
  color: $white-color;
  background-color: $background-color;
  transition: border-color $time-function;
}

.search__input:focus {
  outline: none;
  border-color: $main-color;
}

.ingredients__list {
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: $main-color;
  border: 1px solid $main-color;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 5px 0;
}

.ingredient__item {
  padding: 10px;
  cursor: pointer;
  transition: background-color $time-function;
}

.ingredient__item:hover {
  background-color: $accent-color;
  color: $white-color;
}
.empty__message {
  margin-top: 20px;
  font-size: 20px;
}
</style>
