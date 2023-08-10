<template>
  <AppContainer>
    <GoBackButton @go-back="goBack" />
    <CircleLoader v-if="isLoading" />
    <IngredientItem
      @edit="onEditIngredient"
      @remove="onDeleteIngredient"
      :isMyIngredient="isMyIngredient"
      :ingredient="ingredient"
      v-else
    />

    <section class="ingredient__drinks">
      <h2 class="ingredient__drinks-title">Drinks with {{ ingredient.strIngredient }}</h2>
      <CocktailsList
        :hasMoreData="hasMoreData"
             v-if="cocktails.length > 0"
        :cocktails="cocktails"
      />
    </section>
  </AppContainer>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CircleLoader from '../components/loaders/CircleLoader.vue';
import { getIngredientById } from '@/services/ingredients-api';
import AppContainer from '@/components/shared/AppContainer.vue';
import GoBackButton from '../components/shared/GoBackButton.vue';
import IngredientItem from '../components/ingredients/IngredientItem.vue';
import CocktailsList from '../components/cocktails/CocktailsList.vue';
import { searchDrinksByFilter } from '../services/cocktails-api';

const route = useRoute();

const router = useRouter();
const store = useStore();

// const isLoggedIn = store.getters['auth/isLoggedIn'];

const ingredient = ref({});

const isMyIngredient = ref(false);
const isLoading = ref(false);
const hasMoreData = ref(true);
const cocktails = ref([]);

const ingredientId = computed(() => (route.params.id ? route.params.id : ''));
const page = computed(() => route.query.page ? Number(route.query.page) : 1);

const user = computed(() => {
  return store.getters['auth/getUser'];
});

const getDrinks = async () => {
  try {
    const { drinks } = await searchDrinksByFilter(
      ingredient.value.strIngredient.toLowerCase(),
      page.value,
      'i'
    );

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
  // searchCategory.value = route.query.a ? route.query.a : '';
  await router.push({ query: { ...route.query, page: 1 } });
  isLoading.value = true;
  try {
    const result = await getIngredientById(ingredientId.value);
    ingredient.value = { ...result } || {};
    isMyIngredient.value = ingredient.value?.owner === user.value._id;
    await getDrinks();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

const onEditIngredient = async () => {
  const id = ingredient.value._id;
  router.push({ name: 'edit-Ingredient', params: { id } });
};

const onDeleteIngredient = async () => {
  const confirmed = window.confirm(
    'Are you sure you want to delete your Ingredient?'
  );
  if (confirmed) {
    await removeIngredient(ingredient.value._id);
    router.push('/my-Ingredients');
  }
};

const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue === 1) {
      return;
    }
    getDrinks();
  }
);

</script>

<style lang="scss" scoped>
@import '../assets/scss';
.ingredient {
  &__drinks {
  }

  &__drinks-title {
    text-align: center;
    color: $main-color;
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
