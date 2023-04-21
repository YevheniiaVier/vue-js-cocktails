<template>
  <div class="container">Login Page</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

@media screen and (max-width: 1200px) {
  .container {
    max-width: 960px;
  }
}

@media screen and (max-width: 960px) {
  .container {
    max-width: 720px;
  }
}

@media screen and (max-width: 720px) {
  .container {
    max-width: 480px;
  }
}
</style>
