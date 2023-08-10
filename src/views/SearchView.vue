<template>
  <AppContainer class="nav__container">
    <nav class="navigation">
      <RouterLink
        class="link"
        exact-active-class="active-link"
        :to="{ name: 'by-name' }"
      >
        By name
      </RouterLink>

      <RouterLink
        class="link"
        exact-active-class="active-link"
        :to="{ name: 'by-type' }"
      >
        By type
      </RouterLink>
      <RouterLink
        class="link"
        :class="{ 'active-link': isByLetterActive }"
        :to="generateLetterLink('A')"
      >
        By letter
      </RouterLink>
      <RouterLink
        class="link"
        exact-active-class="active-link"
        :to="{ name: 'by-category' }"
      >
        By category
      </RouterLink>
      <RouterLink
        class="link"
        exact-active-class="active-link"
        :to="{ name: 'by-tag' }"
      >
        By tag
      </RouterLink>
      <RouterLink
        class="link"
        exact-active-class="active-link"
        :to="{ name: 'by-ingredient' }"
      >
        By ingredient
      </RouterLink>
    </nav>

    <RouterView />
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/shared/AppContainer.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();

const generateLetterLink = letter => {
  return { name: 'by-letter', params: { letter } };
};
const isByLetterActive = computed(() => {
  return route.name === 'by-letter';
});
</script>

<style lang="scss" scoped>
@import '../assets/scss';

.navigation {
  display: flex;
  gap: 15px;
  justify-content: space-between;
}
.link {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  color: $text-color;
  background-color: $accent-color;
  transition: all 0.2s ease-in-out;
}
.active-link {
  color: $white-color;
  background-color: $text-color;
}
.nav__container {
  display: flex;
  flex-direction: column;

  align-items: center;
}
</style>
