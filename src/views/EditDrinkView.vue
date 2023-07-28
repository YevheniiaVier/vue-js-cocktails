<template>
  <DrinkForm :photoName="file ? file.name : null" :photoFile="file" @onModalOpen="toggleModal" :cocktail="cocktail" />
  <GoBackButton @go-back="goBack" />
  <Teleport to="#modal">
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal__avatar">
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Avatar photo"
          class="avatar__big"
        />
        <img
          v-else
          :src="BASE_AVATAR_URL"
          alt="Avatar photo"
          class="avatar__big"
        />
      </div>
      <DrinkImgUpdate
        @onChangePhoto="choosePhoto"
        @onFileChoose="updatePreviewImage"
        class="modal__content"
      >
      </DrinkImgUpdate>
    </Modal>
  </Teleport>
</template>

<script setup>
import DrinkForm from '../components/shared/form/DrinkForm.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Modal from '../components/Modal.vue';
import DrinkImgUpdate from '../components/DrinkImgUpdate.vue';
import { getCocktailById } from '../services/cocktails-api';
import GoBackButton from '../components/shared/GoBackButton.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const cocktail = ref({});
const route = useRoute();

const previewImage = ref(null);
const modalActive = ref(false);
const file = ref(null);
const BASE_AVATAR_URL = computed(() => {
  if (cocktail.value && cocktail.value.strDrinkThumb) {
    const url = cocktail.value.strDrinkThumb;
    return url;
  }
});

onMounted(async () => {
  try {
    const drinkId = route.params.id;
    const result = await getCocktailById(drinkId);
    cocktail.value = { ...result } || {};
  } catch (error) {
    console.log(error);
  }
});

const updatePreviewImage = image => {
  previewImage.value = image;
};
const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
  previewImage.value = null;
};
const handleEscapeKey = () => {
  if (modalActive.value) {
    toggleModal();
  }
};
const choosePhoto = photo => {
  file.value = photo;
  console.log('file.name', file.value.name)

  modalActive.value = false;
};

watch(
  () => modalActive.value,
  isActive => {
    if (isActive) {
      window.addEventListener('keydown', handleEscapeKey);
    } else {
      window.removeEventListener('keydown', handleEscapeKey);
    }
  }
);
</script>

<style lang="scss" scoped>
@import '../assets/scss';

.photo {
  &__wrapper {
    width: 100%;
    display: flex;
    position: relative;
  }
  .img {
    width: 100%;
  }
}
.insert {
  &__btn {
    position: absolute;
    cursor: pointer;
    bottom: 3px;
    right: 0;
    width: 40px;
    border: none;
    background-color: transparent;
  }
}
</style>
