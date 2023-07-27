<template>
  <section class="ingredient__main">
    <div class="ingredient__info">
      <h2 class="ingredient__title">{{ ingredient.strIngredient }}</h2>
      

      <div class="ingredient__type">
        <div class="img_wrapper">
        <div v-if="isMyIngredient" class="ingredient__action">
          <button @click="onEdit" class="action__button">
            <Icon class="icon" icon="typcn:edit" />
          </button>
          <button @click="onDelete" class="action__button">
            <Icon class="icon" icon="material-symbols:delete" />
          </button>
        </div>

        <img
          class="ingredient__img"
          :src="ingredient.strImage"
          :alt="ingredient.strIngredient"
        />
      </div>
        <p>Type: {{ ingredient.strType }}</p>
        <p>Contains alcohol: {{ ingredient.strAlcohol }}</p>
      </div>
    </div>
    <p class="ingredient__desc">{{ ingredient.strDescription }}</p>
  </section>

</template>

<script setup>
import { Icon } from '@iconify/vue';
const emit = defineEmits(['edit', 'remove']);

const props = defineProps({
  ingredient: {
    required: true,
    type: Object,
  },
  isMyIngredient: {
    required: true,
    type: Boolean,
  },
});
const onEdit = () => {
  emit('edit');
};

const onDelete = () => {
  emit('remove');
};

</script>

<style lang="scss" scoped>
@import '../../assets//scss/';
.ingredient {
  &__main {
    /* display: flex; */
    /* flex-direction: column; */
    /* gap: 20px; */
    /* justify-content: center; */
    align-items: center;
    margin-top: 20px;
  }

  &__info {
    position: relative;
  }

  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
    text-align: center;
  }

  &__img {
    max-width: 400px;
    height: auto;
    margin-bottom: 15px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__desc {
   text-align: justify;
   line-height: 1.3;
   margin-bottom: 20px;
  }

  &__type {
    display: flex;
    flex-direction: column;

    gap: 15px;
    padding: 10px;
    color: $text-color;
    font-weight: 600;
  }
}

.Ingredient__action {
  position: absolute;
  top: 0;
  left: 0;
}
.action__button {
  width: 40px;
  height: 40px;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
}
.icon {
  width: 60px;
  height: 60px;
  color: #88bde1;
  @include transition(color);
  &:hover {
    color: $main-color;
  }
}
.img_wrapper {
  position: relative;
  align-self: center;
} 

</style>
