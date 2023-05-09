<template>
  <div class="by-letter">
    <h1>cocktails by Letter</h1>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { onMounted, watch, computed } from "vue";
const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// const cocktails = computed(() => store.state.mealsByLetter);
</script>

<style lang="scss" scoped></style>
