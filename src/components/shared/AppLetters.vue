<template>
  <div class="by__letter">
    <RouterLink
      v-for="letter of letters"
      exact-active-class="active-link"
      :key="letter"
      :to="{ name: 'by-letter', params: { letter } }"
      >{{ letter }}</RouterLink
    >
  </div>
</template>

<script setup>
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>

<style lang="scss" scoped>
@import '../../assets/scss';
.by__letter {
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: $accent-color;
  font-weight: bold;
  gap: 5px;
  margin-top: 20px;
}
.active-link {
  color: $white-color;
}
</style>
