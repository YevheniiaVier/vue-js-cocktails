<template>
  <div class="ingredients">
    <p>Ingredients:</p>
    <ul v-if="ingredients.length" class="ingredients__list">
      <template v-for="(el, idx) of new Array(15)" :key="idx">
        <li v-if="cocktail[`strIngredient${idx + 1}`]">
          <RouterLink
            class="ingredients__item"
            :to="getRouterLink(cocktail[`strIngredient${idx + 1}`])"
          >
            <img
              class="ingredients__img"
              :src="`https://www.thecocktaildb.com/images/ingredients/${
                cocktail[`strIngredient${idx + 1}`]
              }.png`"
              :alt="cocktail[`strIngredient${idx + 1}`]"
            />
            {{ cocktail[`strIngredient${idx + 1}`] }} :
            {{ cocktail[`strMeasure${idx + 1}`] || 'some' }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import { getAllOfIngredients } from '../../services/ingredients-api';
const store = useStore();

const ingredients = ref([]);

const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  try {
    const result = await getAllOfIngredients();
    ingredients.value = [...result.ingredients];
  } catch (error) {
    console.log(error);
  }
});

const getRouterLink = name => {
  const data = ingredients.value.find(el => el.strIngredient === name);
  if (!data) {
    return {};
  }
  return {
    name: 'ingredient',
    params: {
      id: data._id,
    },
  };
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/';
.ingredients {
  font-weight: 600;
  font-size: 25px;
  line-height: 1.16;
  margin-bottom: 20px;
  text-align: center;

  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
  }

  &__list {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.16;
    margin-bottom: 20px;
    color: $text-color;
    font-weight: 600;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__img {
    max-width: 100px;
    height: auto;
  }
}
</style>
