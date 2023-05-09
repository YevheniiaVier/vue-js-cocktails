<template>
  <div class="auth__actions">
    <RouterLink
      exact-active-class="active-link"
      :to="{ name: 'login-page' }"
      class="auth__link"
      >Login</RouterLink
    >
    |
    <RouterLink
      exact-active-class="active-link"
      :to="{ name: 'register-page' }"
      class="auth__link"
      >Registration</RouterLink
    >
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/scss";
.auth {
  &__actions {
    color: $white-color;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    @include transition(color);
    &:hover {
      color: $accent-color;
    }
  }
}
</style>
