<template>
  <button type="button" @click="onClick" class="heart__wrapper">
    <Icon v-if="isFavorite" icon="mdi:cards-heart" color="#c61212" />
    <Icon v-else icon="mdi:cards-heart-outline" color="#c61212" />
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
.star {
  color: rgb(198, 18, 18);
}
</style>
