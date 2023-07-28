<template>
  <section class="cocktail">
    <AppContainer>
      <GoBackButton @go-back="goBack" />
      <CircleLoader v-if="isLoading" />
      <div v-else>
        <div class="cocktail__main">
          <div class="cocktail__info">
            <h2 class="cocktail__title">{{ cocktail.strDrink }}</h2>
            <div class="img_wrapper">
              <div v-if="isMyDrink" class="drink__action">
                <button @click="onEditDrink" class="action__button">
                  <Icon class="icon" icon="typcn:edit" />
                </button>
                <button @click="onDeleteDrink" class="action__button">
                  <Icon class="icon" icon="material-symbols:delete" />
                </button>
              </div>
              <FavoriteButton
                v-if="user.favorite"
                :isFavorite="isFavorite"
                @toggle-favorite="toggleFavorite"
              />
              <img
                class="cocktail__img"
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
              />
            </div>

            <div class="rating__tags">
              <StarRating
                @click="toggleModal"
                :rating="ratings"
                :key="ratingKey"
              />
              <p>Total votes: {{ votes }}</p>
              <CocktailTags :tags="cocktail.strTags" />
            </div>
            <div class="cocktail__type">
              <CocktailsType
                v-if="cocktail.strAlcoholic"
                :drinkType="cocktail.strAlcoholic"
              />
              <CocktailsCategory
                v-if="cocktail.strCategory"
                :category="cocktail.strCategory"
              />
              <p v-if="cocktail.strVideo">
                Video link: 
                <a href="cocktail.strVideo">{{ cocktail.strVideo }}</a>
              </p>
            </div>
          </div>
          <Ingredients :cocktail="cocktail" />
        </div>

        <CocktailInstructions :cocktail="cocktail" />
      </div>

      <Teleport to="#modal">
        <Modal @close="toggleModal" :modalActive="modalActive">
          <AddRating
            class="rating__modal"
            @update-rating="updateRating"
            @keydown.escape="handleEscapeKey"
            @on-close="toggleModal"
            :drinkId="cocktail._id"
          ></AddRating>
        </Modal>
      </Teleport>
    </AppContainer>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CircleLoader from '../components/loaders/CircleLoader.vue';
import {
  getCocktailById,
  getAverageRating,
  removeDrink,
} from '@/services/cocktails-api';
import Modal from '../components/Modal.vue';
import AddRating from '../components/AddRating.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import GoBackButton from '../components/shared/GoBackButton.vue';
import StarRating from '../components/StarRating.vue';
import CocktailInstructions from '../components/instructions/CocktailInstructions.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import FavoriteButton from '../components/FavoriteButton.vue';
import CocktailTags from '../components/cocktails/CocktailTags.vue';
import Ingredients from '../components/ingredients/Ingredients.vue';
import CocktailsType from '../components/cocktails/CocktailsType.vue';

import CocktailsCategory from '../components/cocktails/CocktailsCategory.vue';
const route = useRoute();

const router = useRouter();
const $toast = useToast();
const store = useStore();

const isLoggedIn = store.getters['auth/isLoggedIn'];

const cocktail = ref({});
const modalActive = ref(false);
const ratings = ref(0);
const votes = ref(0);
const ratingKey = ref(1);
const isFavorite = ref(false);
const isMyDrink = ref(null);
const isLoading = ref(false);

const cocktailId = route.params.id;

const user = computed(() => {
  return store.getters['auth/getUser'];
});

onMounted(async () => {
  isLoading.value = true;

  try {
    const result = await getCocktailById(cocktailId);
    cocktail.value = { ...result } || {};

    isMyDrink.value = cocktail.value.owner === user.value._id;
    const { averageRating, totalVotes } = await getAverageRating(cocktailId);
    ratings.value = averageRating;
    votes.value = totalVotes;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

const onEditDrink = async () => {
  const id = cocktail.value._id;
  router.push({ name: 'edit-drink', params: { id } });
};

const onDeleteDrink = async () => {
  const confirmed = window.confirm(
    'Are you sure you want to delete your drink?'
  );
  if (confirmed) {
    await removeDrink(cocktail.value._id);
    router.push('/my-drinks');
  }
};

const updateRating = async () => {
  const { averageRating, totalVotes } = await getAverageRating(cocktailId);
  ratings.value = averageRating;
  votes.value = totalVotes;
};

const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};

const toggleModal = () => {
  if (!isLoggedIn) {
    return $toast.open({
      message: 'Please log in to add value to the drink',
      type: 'warning',
      position: 'top-right',
    });
  }
  modalActive.value = !modalActive.value;
};
const handleEscapeKey = () => {
  if (modalActive.value) {
    toggleModal();
  }
};

watch([() => user?.value?.favorite, () => cocktail.value._id], () => {
  isFavorite.value = user.value.favorite?.includes(cocktail.value._id)
    ? true
    : false;
});

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
const toggleFavorite = async () => {
  try {
    await store.dispatch('auth/toggleFavoriteList', cocktail.value._id);
  } catch {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss';

.cocktail {
  &__main {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }

  &__info {
    position: relative;
  }

  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
    text-align: center;
  }

  &__img {
    max-width: 400px;
    height: auto;
    margin-bottom: 15px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__tags {
    display: flex;
  }

  &__type {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 15px;
    padding: 10px;
    color: $text-color;
    font-weight: 600;
  }
}

.drink__action {
  position: absolute;
  top: 0;
  left: 0;
}
.action__button {
  width: 40px;
  height: 40px;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
}
.icon {
  width: 60px;
  height: 60px;
  color: #88bde1;
  @include transition(color);
  &:hover {
    color: $main-color;
  }
}
.img_wrapper {
  position: relative;
}
</style>
