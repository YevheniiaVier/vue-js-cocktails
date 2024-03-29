<template>
  <nav class="navbar">
    <RouterLink
      class="link"
      exact-active-class="active-link"
      :to="{ name: 'my-page' }"
    >
      My Page
    </RouterLink>

    <RouterLink
      class="link"
      exact-active-class="active-link"
      :to="{ name: 'search' }"
    >
      Search Cocktails
    </RouterLink>
    <div class="profile">
      <div class="avatar">
        <img
          v-if="user.avatarURL"
          class="account__img"
          :src="BASE_AVATAR_URL"
          alt="User avatar"
          @click="toggleModal"
        />
        <svg
          v-else
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
        <button type="button" @click="toggleModal" class="avatar__btn">
          <Icon
            class="photo__icon"
            icon="material-symbols:photo-camera"
            color="#230312"
            width="20"
            height="20"
          />
        </button>
      </div>

      <p>
        {{ user.name }}
      </p>
      <button @click="handleLogout" type="button" class="logout__btn">
        <Icon class="logout__icon" icon="ri:logout-circle-r-line" />
      </button>
    </div>
    <Teleport to="#modal">
      <Modal @close="toggleModal"  :modalActive="modalActive">
        <div  class="modal__avatar">
          <img v-if="previewImage" :src="previewImage" alt="Avatar photo" class="avatar__big" />
          <img  v-else :src="BASE_AVATAR_URL" alt="Avatar photo" class="avatar__big">
        </div>
        <AvatarUpdate @upload="photoUploaded" @onFileChoose="updatePreviewImage" class="modal__content">
        </AvatarUpdate>
      </Modal>
    </Teleport>
  </nav>
</template>
<script setup>
import { computed, ref, watch } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "../Modal.vue";
import AvatarUpdate from "../AvatarUpdate.vue";
const store = useStore();
const router = useRouter();


const user = computed(() => {
  return store.getters["auth/getUser"];
});
const previewImage = ref(null);

const handleEscapeKey = () => {
  if (modalActive.value) {
    toggleModal();
  }
};
const updatePreviewImage = (image) => {
  previewImage.value = image;
};

const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
  previewImage.value = null;
};
const photoUploaded = () => {
  modalActive.value = false;

};

const BASE_AVATAR_URL = computed(() => {
  if (user.value && user.value.avatarURL) {
    const url = user.value.avatarURL
    return url;
  }
});

const handleLogout = async () => {
  try {
    await store.dispatch("auth/logOut");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
watch(
  () => modalActive.value,
  (isActive) => {
    if (isActive) {
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      window.removeEventListener("keydown", handleEscapeKey);
    }
  }
);
</script>

<style lang="scss" scoped>
@import "../../assets/scss";

.navbar {
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  gap: 1rem;
  color: $white-color;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  border-radius: 50%;
  // height: auto;
  overflow: hidden;
  display: block;
}
.account__img {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
}
.profile {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}
.active-link {
  color: $accent-color;
  // font-weight: bold;
}
.avatar {
  position: relative;
  padding: 0;
  display: flex;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.modal__avatar {
max-width: 90%;
max-height: 500px;
display: flex;
margin-bottom: 20px;
}
.avatar__big {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.modal__title {
  font-size: 25px;
  text-align: center;
  color: $background-color;
}
.avatar__btn {
  width: 25px;
  height: 25px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: white;
  border-radius: 50%;
  bottom: -5px;
  right: -5px;
}
.photo__icon {
  flex-shrink: 0;
}
</style>
