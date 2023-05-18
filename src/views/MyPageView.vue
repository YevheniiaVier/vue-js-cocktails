<template>
  <AppContainer class="nav__container">
    <div class="navigation">
      <RouterLink
      class="link"
      exact-active-class="active-link"
      :to="{ name: 'favorites' }"
    >
      My favorite drinks
    </RouterLink>

    <RouterLink
      class="link"
      exact-active-class="active-link"
      :to="{ name: 'my-drinks' }"
    >
      My cocktails
    </RouterLink>
    <RouterLink
      class="link"
      exact-active-class="active-link"
      :to="{ name: 'add-drink' }"
    >
      Add cocktail
    </RouterLink>
    </div>
 
    <RouterView/>
     
  </AppContainer>
</template>

<script setup>
import AppContainer from "@/components/shared/AppContainer.vue";
</script>

<style lang="scss" scoped>
@import "../assets/scss";

.navigation {
  display: flex;
  // width: 60%;
  gap: 20px;
  // flex-direction: column;
  justify-content: space-between;
}
.link {
width: 160px;
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
  // font-weight: bold;
}
.nav__container {
  display: flex;
  flex-direction: column;

  align-items: center;
}
</style>
