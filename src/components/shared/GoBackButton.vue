<template>
  <button :disabled="loading" class="btn" @click="$emit('click')">
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
  position: relative;
  display: inline-block;
  font-size: 18px;
  background: $main-color;
  // color: #fff;
  cursor: pointer;
  min-width: 100px;
  border: 1px solid transparent;
  padding: 4px 4px;
  font-family: Montserrat, sans-serif;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;

  @include transition(background-color);

  // align-items: center;

  // appearance: none;
  // border: 0;
  // border-radius: 20px;

  // box-sizing: border-box;
  // color: $main-color;
  // cursor: pointer;
  // display: inline-flex;
  // gap: 5px;
  // font-family: "JetBrains Mono", monospace;
  // height: 40px;
  // justify-content: center;
  // line-height: 1;
  // list-style: none;
  // overflow: hidden;
  // padding-left: 16px;
  // padding-right: 16px;
  // position: relative;
  // text-align: left;
  // text-decoration: none;

  // user-select: none;
  // -webkit-user-select: none;
  // touch-action: manipulation;
  // white-space: nowrap;
  // will-change: box-shadow, transform;
  // font-size: 18px;
  &:hover {
    background: $accent-color;
    border: 1px solid darken($accent-color, 10%);
  }
  @include transition(background-color);

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
