<template>
  <section class="cocktail">
    <AppContainer>
      <div class="cocktail__main">
        <div class="cocktail__info">
          <h2 class="cocktail__title">{{ cocktail.strDrink }}</h2>
          <img
            class="cocktail__img"
            :src="cocktail.strDrinkThumb"
            :alt="cocktail.strDrink"
          />
          <div v-if="cocktail.strTags" class="cocktail__tags tags">
            <p class="tags__names">{{ cocktail.strTags }}</p>
          </div>
        </div>

        <div class="cocktail__ingredients ingredients">
          <h2 class="ingredients__title">Ingredients</h2>

          <ul class="ingredients__list">
            <template v-for="(el, idx) of new Array(15)" :key="idx">
              <li
                class="ingredients__item"
                v-if="cocktail[`strIngredient${idx + 1}`]"
              >
                <img
                  class="ingredients__img"
                  :src="`https://www.thecocktaildb.com/images/ingredients/${
                    cocktail[`strIngredient${idx + 1}`]
                  }.png`"
                  :alt="cocktail[`strIngredient${idx + 1}`]"
                />
                {{ cocktail[`strIngredient${idx + 1}`] }} :
                {{ cocktail[`strMeasure${idx + 1}`] || "some" }}
              </li>
            </template>
          </ul>
        </div>
      </div>

      <h2 class="cocktail__instructions instructions">Instructions</h2>
      <p class="instructions__langs">choose the language</p>
      <p class="instructions__text">{{ cocktail.strInstructions }}</p>
      <h2 class="cocktail__glass glass">Glass</h2>
      <p class="glass__text">Serve: {{ cocktail.strGlass }}</p>
    </AppContainer>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getCocktailById } from "@/services/cocktails-api";
import AppContainer from "@/components/shared/AppContainer.vue";
const route = useRoute();
const cocktail = ref({});
// const ingredients = ref([]);
onMounted(async () => {
  const cocktailId = route.params.id;
  const result = await getCocktailById(cocktailId);
  cocktail.value = result.drinks[0] || {};
});
</script>

<style lang="scss" scoped>
@import "../assets/scss";
.cocktail {
  text-align: center;

  &__main {
    display: flex;
    gap: 20px;
  }
  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
  }

  &__img {
    width: 400px;
    height: auto;
    margin-bottom: 15px;
  }

  &__tags {
    display: flex;
  }

  &__ingredients {
    margin-bottom: 20px;
  }

  &__instructions {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
  }

  &__glass {
    color: red;
  }
}
.tags {
  &__names {
    color: green;
  }
}
.ingredients {
  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
  }

  &__list {
    color: gray;
  }

  &__item {
    color: yellow;
  }

  &__img {
    width: 200px;
    height: auto;
  }

  &__text {
    color: yellow;
  }
}
.instructions {
  &__langs {
    margin-bottom: 20px;
  }

  &__text {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.16;
    margin-bottom: 20px;
  }
}
.glass {
  margin-bottom: 15px;
  &__text {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.16;
  }
}
</style>
