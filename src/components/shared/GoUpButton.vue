<template>
  <button ref="btn" class="btn" @click="goUp">
    <Icon icon="fluent-mdl2:up" />
  </button>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const btn = ref(null);

const goUp = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (btn.value) {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? (btn.value.style.opacity = '1')
      : (btn.value.style.opacity = '0');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss';
.btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  font-size: 18px;
  background: $main-color;
  width: 50px;
  height: 50px;
  border: 1px solid transparent;
  padding: 4px 4px;
  font-family: Montserrat, sans-serif;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;

  @include transition(all);

  &:hover {
    background: $accent-color;
    border: 1px solid darken($accent-color, 10%);
  }
  @include transition(all);
}
</style>
