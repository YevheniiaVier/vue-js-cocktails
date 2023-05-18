<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import AppHeader from "./components/header/index.vue";
import AppFooter from "./components/AppFooter.vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("auth/refreshUser");
});
</script>

<template>
  <AppHeader />
  <div class="content">
    <RouterView />
  </div>
  <AppFooter />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

.content {
  padding-top: 60px;
  flex-grow: 1;
}

</style>
