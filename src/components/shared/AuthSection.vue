<template>
  <section class="auth__section">
    <slot></slot>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
.auth__section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../../public/img/loginbcg.jpg");
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 90px);
}
</style>
