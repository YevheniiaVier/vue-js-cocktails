<template>
  <RouterLink
    class="cocktail"
    :to="{ name: 'cocktail', params: { id: cocktail._id } }"
  >
    <div class="cocktail__wrapper">
      <img
        class="cocktail__img"
        :src="cocktail.strDrinkThumb"
        :alt="cocktail.strDrink"
      />
      <div class="cocktail__info">
        <p>{{ cocktail.strAlcoholic }}</p>
        <p class="ingredients">Ingredients:</p>
        <ul class="ingredients__list">
          <template v-for="(el, idx) of new Array(15)" :key="idx">
            <li v-if="cocktail[`strIngredient${idx + 1}`]">
              {{ idx + 1 }}. {{ cocktail[`strIngredient${idx + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
    </div>

    <h2 class="cocktail__title">{{ cocktail.strDrink }}</h2>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  cocktail: {
    required: true,
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss";
.cocktail {
  color: $text-color;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include transition(color);
  cursor: pointer;

  &:hover {
    color: $main-color;
  }
  &__title {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.16;
    margin-top: 10px;
  }

  &__img {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 5px;
  }

  &__info {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 8px;
    color: $main-color;
    font-weight: bold;
    background-color: rgba(25, 25, 25, 0.743);
    opacity: 0;
    @include transition(opacity);

    &:hover {
      opacity: 1;
    }
  }
}
.ingredients {
  margin-top: 10px;
  margin-bottom: 5px;
  &__list {
    margin-top: 5px;
    max-height: calc(1em * 1.3 * 6);
    overflow: hidden;
    line-height: 1.3;
    align-self: left;
  }

  &__item {
  }

  &__text {
  }
}
.cocktail__wrapper {
  position: relative;
  @include transition(box-shadow);
  border-radius: 5px;
  &:hover {
    box-shadow: 0 2.8px 2.2px rgba(232, 223, 223, 0.034),
      0 6.7px 5.3px rgba(222, 204, 204, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(234, 222, 222, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(223, 211, 211, 0.12);
  }
}
</style>
