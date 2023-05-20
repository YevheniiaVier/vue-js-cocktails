<template>
  <button type="button" @click="onClick" class="heart__wrapper">
    <Icon v-if="isFavorite" class="heart" icon="mdi:cards-heart"/>
    <Icon v-else  class="heart" icon="mdi:cards-heart-outline"  />
  </button>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const props = defineProps({
  isFavorite: {
    type: Boolean,
  },
});
const emit = defineEmits(['toggle-favorite']);
const onClick = () => {
  emit('toggle-favorite');
};
</script>

<style lang="scss" scoped>
@import '../assets/scss';
.heart__wrapper {
  padding: 0;
  position: absolute;
  top: -5px;
  right: 0;
cursor: pointer;
background-color: transparent;
// box-shadow: none;
border: none;
}
.heart {
  color: rgb(198, 18, 18);
  @include transition(color);
  width: 60px;
  height: 60px;
  &:hover {
    color: red;
  }
}
</style>
