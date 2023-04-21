<template>
  <div>
    <router-link class="logo" :to="{ name: 'home' }">
      <div class="logo__wrapper">
        <img class="logo__img" src="../assets/logo.png" alt="logo" />
      </div>
      <p class="logo_text">Cocktails</p>
    </router-link>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
@import "../assets/scss";
.logo {
  display: flex;
  align-items: center;
  &_text {
  }

  &__wrapper {
    position: absolute;
    width: 50px;
  }

  &__img {
    width: 100%;
  }
}
</style>
