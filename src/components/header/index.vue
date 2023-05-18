<template>
  <header class="header">
    <AppContainer class="header__container">
      <AppLogo class="logo" />

      <NavBar v-if="isLoggedIn" />
      <AuthActions v-else />
    </AppContainer>
  </header>
</template>

<script setup>
import AppContainer from "../shared/AppContainer.vue";
import AppLogo from "../AppLogo.vue";
import NavBar from "./NavBar.vue";
import AuthActions from "./AuthActions.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isLoggedIn = computed(() => {
  return store.getters["auth/isLoggedIn"];
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss";

.header {
  box-sizing: border-box;
  height: 60px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: darken($background-color, 5%);
  color: $white-color;
  &__container {
    display: flex;
    justify-content: space-between;
  }
}
.header__container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
