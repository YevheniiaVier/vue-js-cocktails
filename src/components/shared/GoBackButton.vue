<template>
  <button :disabled="loading" class="btn" @click="$emit('go-back')">
    <Icon icon="humbleicons:arrow-go-back" color="#230312" width="15" />
    <span class="btn__content"> Go Back </span>
    <CircleLoader v-if="loading" width="34" height="34" class="btn__loader" />
  </button>
</template>

<script setup>
import CircleLoader from "../loaders/CircleLoader.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss";
.btn {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  font-size: 18px;
  background: $main-color;
  z-index: 5;
  cursor: pointer;
  min-width: 100px;
  border: 1px solid transparent;
  padding: 4px 4px;
  font-family: Montserrat, sans-serif;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;

  @include transition(background-color);



  &:hover {
    background: $accent-color;
    border: 1px solid darken($accent-color, 10%);
  }


  &__content {
    &--hidden {
      opacity: 0;
    }
  }
  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
