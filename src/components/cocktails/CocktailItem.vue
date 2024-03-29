<template>
  <li class="cocktail__item">
    <RouterLink
      class="cocktail"
      :to="{ name: 'cocktail', params: { id: cocktail._id } }"
    >
      <div class="cocktail__wrapper">
        <div class="favorite">
          <Icon v-if="isFavorite" icon="mdi:cards-heart" color="#c61212" />
          <Icon v-else icon="mdi:cards-heart-outline" color="#c61212" />
        </div>
        <StarRating class="rating" :rating="cocktail.averageRating" />

        <img
          class="cocktail__img"
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
        />
        <div class="cocktail__info">
          <p>{{ cocktail.strAlcoholic }}</p>
          <IngredientsList :cocktail="cocktail" />
        </div>
      </div>

      <h2 class="cocktail__title">{{ cocktail.strDrink }}</h2>
    </RouterLink>
  </li>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import StarRating from '../StarRating.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import IngredientsList from '../ingredients/IngredientsList.vue';
const store = useStore();

const props = defineProps({
  cocktail: {
    required: true,
    type: Object,
  },
});

const user = computed(() => {
  return store.getters['auth/getUser'];
});

const isFavorite = computed(() => {
  if (!user.value) {
    return false;
  }
  if (!user.value?.favorite) {
    return false;
  }

  return user.value.favorite.includes(props.cocktail._id);
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss';
.cocktail__item {
  width: 320px;
  height: 320px;
  margin-bottom: 20px;
}
.cocktail {
  color: $text-color;
  width: 100%;
  height: 100%;
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
    height: 100%;
    object-fit: contain;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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

.cocktail__wrapper {
  width: 100%;
  height: 100%;
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
.favorite {
  position: absolute;
  top: 2%;
  left: 2%;
}
.rating {
  position: absolute;
  top: 2%;
  right: 2%;
  // background-color: rgba(38, 41, 41, 0.773);
}
</style>
