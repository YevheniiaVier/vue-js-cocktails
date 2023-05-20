<template>
  <div class="by__letter">
    <RouterLink
      v-for="letter of letters"
      :key="letter"
      :to="{ name: 'by-letter', params: { letter } }"
      >{{ letter }}</RouterLink
    >
  </div>
</template>

<script setup>
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>

<style lang="scss" scoped></style>
