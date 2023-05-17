<template>
  <section class="cocktail">
    <AppContainer>
      <GoBackButton @click="goBack" />
      <div class="cocktail__main">
        <div class="cocktail__info">
          <h2 class="cocktail__title">{{ cocktail.strDrink }}</h2>
          <img
            class="cocktail__img"
            :src="cocktail.strDrinkThumb"
            :alt="cocktail.strDrink"
          />
          <div class="rating__tags">
            <StarRating
              @click="toggleModal"
              :rating="ratings"
              :key="ratingKey"
            />
            <p>Total votes: {{ votes }}</p>
            <p v-if="cocktail.strTags" class="tags__names">
              {{ cocktail.strTags }}
            </p>
          </div>
          <div class="cocktail__type">
            <p>Type: {{ cocktail.strAlcoholic }}</p>
            <p>Category: {{ cocktail.strCategory }}</p>
          </div>
        </div>

        <div class="cocktail__ingredients ingredients">
          <h2 class="ingredients__title">Ingredients</h2>

          <ul class="ingredients__list">
            <template v-for="(el, idx) of new Array(15)" :key="idx">
              <li
                class="ingredients__item"
                v-if="cocktail[`strIngredient${idx + 1}`]"
              >
                <img
                  class="ingredients__img"
                  :src="`https://www.thecocktaildb.com/images/ingredients/${
                    cocktail[`strIngredient${idx + 1}`]
                  }.png`"
                  :alt="cocktail[`strIngredient${idx + 1}`]"
                />
                {{ cocktail[`strIngredient${idx + 1}`] }} :
                {{ cocktail[`strMeasure${idx + 1}`] || "some" }}
              </li>
            </template>
          </ul>
        </div>
      </div>

      <h2 class="cocktail__instructions instructions">Instructions</h2>
      <p class="instructions__langs">choose the language</p>
      <p class="instructions__text">{{ cocktail.strInstructions }}</p>
      <h2 class="cocktail__glass glass">Glass</h2>
      <p class="glass__text">Serve: {{ cocktail.strGlass }}</p>
      <Teleport to="#modal">
        <Modal @close="toggleModal" :modalActive="modalActive">
          <h1>this is Modal</h1>
          <AddRating
            @update-rating="updateRating"
            @close="toggleModal"
            :drinkId="cocktail._id"
          ></AddRating>
        </Modal>
      </Teleport>
    </AppContainer>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { getCocktailById, getAverageRating } from "@/services/cocktails-api";
import Modal from "../components/Modal.vue";
import AddRating from "../components/AddRating.vue";
import AppContainer from "@/components/shared/AppContainer.vue";
import GoBackButton from "../components/shared/GoBackButton.vue";
import StarRating from "../components/StarRating.vue";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const route = useRoute();
const cocktail = ref({});
const router = useRouter();
const $toast = useToast();
const store = useStore();

const isLoggedIn = store.getters["auth/isLoggedIn"];

const modalActive = ref(false);

const ratings = ref(0);
const votes = ref(0);
const ratingKey = ref(1);
onMounted(async () => {
  const cocktailId = route.params.id;
  const result = await getCocktailById(cocktailId);
  cocktail.value = { ...result } || {};

  const { averageRating, totalVotes } = await getAverageRating(cocktailId);
  ratings.value = averageRating;
  votes.value = totalVotes;
});
const updateRating = ({ avgRating, totalVotes }) => {
  ratings.value = avgRating;
  votes.value = totalVotes;
};

const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push("/");
};

const toggleModal = () => {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return $toast.open({
      message: "Please log in to add value to the drink",
      type: "warning",
      position: "top-right",
    });
  }
  modalActive.value = !modalActive.value;
};
watch(ratings, (newRating, oldRating) => {
  ratingKey.value += 1;
});
</script>

<style lang="scss" scoped>
@import "../assets/scss";

.cocktail {
  &__main {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }

  // &__info {
  // }

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

  &__ingredients {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
    text-align: center;
  }
}
.tags {
  &__names {
    color: green;
  }
}
.ingredients {
  &__title {
    font-weight: 600;
    font-size: 25px;
    line-height: 1.16;
    margin-bottom: 20px;
  }

  &__list {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.16;
    margin-bottom: 20px;
    color: $text-color;
    font-weight: 600;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__img {
    max-width: 100px;
    height: auto;
  }
}

.instructions {
  padding: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 25px;
  text-align: center;
  &__langs {
    margin-bottom: 20px;
    text-align: center;
  }

  &__text {
    text-align: center;
    color: $text-color;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
.glass {
  text-align: center;
  margin-bottom: 10px;

  &__text {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.16;
    text-align: center;
    color: $text-color;
    font-weight: 600;
  }
}
</style>
