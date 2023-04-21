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
        <svg
          class="logout__icon"
          fill="#000000"
          height="800px"
          width="800px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 490.3 490.3"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			C27.9,58.95,0,86.75,0,121.05z"
              />
              <path
                d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			C380.6,325.15,380.6,332.95,385.4,337.65z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  </nav>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
  width: 20px;
  height: 20px;
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
