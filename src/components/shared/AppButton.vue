<template>
  <button
    :disabled="loading"
    :type="type"
    :class="{ btn: true, 'btn--outlined': outlined }"
    @click="$emit('click')"
  >
    <CircleLoader v-if="loading" width="34" height="34" class="btn__loader" />
    <span class="btn__content" :class="contentStyle">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import CircleLoader from "../loaders/CircleLoader.vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,

  }
});
const contentStyle = computed(() => ({
  "btn__content--hidden": props.loading,
}));
</script>

<style lang="scss" scoped>
@import "../../assets/scss";
.btn {
  position: relative;
  display: inline-block;
  font-size: 18px;
  background: $main-color;
  color: #fff;
  cursor: pointer;
  max-width: 220px;
  border: 1px solid transparent;
  padding: 8px 15px;
  font-family: Montserrat, sans-serif;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  width: 70%;
  @include transition(background-color);

  &:hover {
    background: $accent-color;
    border: 1px solid darken($accent-color, 10%);
  }
  &--outlined {
    background: none;
    border: 1px solid $accent-color;
    color: $accent-color;
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
