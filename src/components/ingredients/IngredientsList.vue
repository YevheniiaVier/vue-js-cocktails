<template>
  <p class="ingredients">Ingredients:</p>
  <ul class="ingredients__list">
    <template v-for="(el, idx) of new Array(15)" :key="idx">
      <li v-if="cocktail[`strIngredient${idx + 1}`]">
        {{ idx + 1 }}. {{ cocktail[`strIngredient${idx + 1}`] }}
      </li>
    </template>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
});


</script>

<style lang="scss" scoped>
@import '../../assets/scss/';
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

}
</style>
