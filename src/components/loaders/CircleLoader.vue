<template>
  <div class="loader__wrapper">
    <span>
      <svg
        class="preloader-icon"
        viewBox="0 0 100 100"
        :width="width"
        :height="height"
        :style="style"
      >
        <circle cx="50" cy="50" r="40" stroke-width="5" fill="none"></circle>
      </svg>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  width: {
    type: [Number, String],
    default: 50,
  },
  height: {
    type: [Number, String],
    default: 50,
  },
  color: {
    type: String,
    default: "#fff",
  },
});
const style = computed(() => `stroke: ${props.color};`);
</script>
<style lang="scss" scoped>
.preloader-icon {
  stroke-dasharray: 0 250;
  animation: preloader 4s infinite;
}
@keyframes preloader {
  0% {
    stroke-dasharray: 0 250;
    transform: rotate(0);
  }
  50% {
    stroke-dasharray: 255 250;
    transform: rotate(650deg);
  }
  100% {
    stroke-dasharray: 0 250;
    transform: rotate(0);
  }
}
.loader__wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
