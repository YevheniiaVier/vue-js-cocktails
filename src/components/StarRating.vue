<template>
  <div class="star-rating">
    <span
      v-for="index in starLimit"
      :key="index"
      class="star star--outlined"
    ></span>
    <div class="star-rating__colored" :style="ratingWidthStyle">
      <span
        v-for="index in starLimit"
        :key="index"
        class="star star--colored"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  starLimit: {
    type: Number,
    default: 5,
  },
});
const ratingWidth = computed(() => {
  return (props.rating / props.starLimit) * 100;
});
const ratingWidthStyle = computed(() => {
  return `width: ${ratingWidth.value}%;`;
});
</script>

<style lang="scss" scoped>
.star-rating {
  position: relative;
  display: inline-flex;

  &__colored {
    display: inline-flex;
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
.star {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0 3px;
  flex-shrink: 0;

  &--colored {
    background: url("../../star-filled.svg") center no-repeat;
  }

  &--outlined {
    background: url("../../star-outlined.svg") center no-repeat;
  }
}
</style>
