<template>
  <nav class="navbar">
    <router-link class="link" :to="{ name: 'ingredients' }">
      Ingredients
    </router-link>

    <router-link class="link" :to="{ name: 'byName' }">
      Search Cocktails
    </router-link>
    <div class="profile">
      <svg
        class="account__icon"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C5.38286 0 3.25391 2.12896 3.25391 4.74609C3.25391 7.36323 5.38286 9.49219 8 9.49219C10.6171 9.49219 12.7461 7.36323 12.7461 4.74609C12.7461 2.12896 10.6171 0 8 0Z"
        />
        <path
          d="M15.8216 14.0161C14.4028 11.8877 12.0282 10.6172 9.4708 10.6172H6.5292C3.9718 10.6172 1.5972 11.8877 0.178438 14.0161L0.0898438 14.1489V18H15.9102H15.9102V14.1489L15.8216 14.0161Z"
        />
      </svg>
      <button @click="handleLogout" type="button" class="logout__btn">
        <Icon class="logout__icon" icon="ri:logout-circle-r-line" />
      </button>
    </div>
  </nav>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
const store = useStore();
const router = useRouter();

// const logOut = () => {
//   store.dispatch("auth/logOut");
// };

const handleLogout = async () => {
  try {
    await store.dispatch("auth/logOut");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss";

.navbar {
  display: flex;
  gap: 1rem;
  color: $white-color;
  align-items: center;
}
.logout__icon {
  width: 25px;
  height: 25px;
  fill: $white-color;
  transition: all 0.2s ease-in-out;
}
.logout__btn {
  background-color: transparent;
  border: none;
  color: $white-color;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: $accent-color;
  }
}

.logout__btn:hover .logout__icon {
  fill: $accent-color;
}
.account__icon {
  transition: fill 0.4s;
  fill: currentColor;
  width: 16px;
  height: 18px;
}
.profile {
  display: flex;
  gap: 5px;
}
</style>
