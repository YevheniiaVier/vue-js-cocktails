<template>
  <RouterLink
    exact-active-class="active-link"
    class="logo"
    :to="{ name: 'home' }"
  >
    <div class="logo__wrapper">
      <img class="logo__img" src="../assets/logo.png" alt="logo" />
    </div>
    <p class="logo_text">Home</p>
  </RouterLink>
</template>

<script setup></script>
<style lang="scss" scoped>
@import "../assets/scss";
.logo {
  display: flex;
  // flex-direction: column;
  align-items: center;
  &_text {
  }

  &__wrapper {
    // position: absolute;
    width: 50px;
  }

  &__img {
    width: 100%;
  }
}
.active-link {
  color: $accent-color;
  font-weight: bold;
}
</style>
