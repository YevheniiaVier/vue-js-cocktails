<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.container {
position: relative;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
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
