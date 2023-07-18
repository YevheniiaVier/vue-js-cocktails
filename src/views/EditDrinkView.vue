<template>
  <div>
    <!-- <p v-if="ingredients.length">{{ingredients}}</p> -->
    <AppForm @submit="handleSubmit">
      <AppInput
        class="required-field"
        id="strDrink"
        label="Drink Name *"
        v-model="formData.strDrink"
      />
      <span
        v-for="error in v$.strDrink.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      >
      <div class="photo__wrapper">
        <AppInput
          class="img required-field"
          id="strDrinkThumb"
          label="Drink photo *"
          v-model="formData.strDrinkThumb"
          readonly
        />
        <button type="button" class="insert__btn" @click="toggleModal">
          <Icon
            icon="material-symbols:attach-file-add-rounded"
            color="#230312"
            width="25"
            height="25"
          />
        </button>
      </div>

      <!-- <AppInput
        class="required-field"
        @change="onFileChange"
        type="file"
        id="strDrinkThumb"
        label="Drink photo *"
        v-model="formData.strDrinkThumb"
      /> -->
      <!-- <span
        v-for="error in v$.strDrinkThumb.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      > -->
      <AppInput id="strTags" label="Tags" v-model="formData.strTags" />
      <AppInput
        id="strVideo"
        label="Link to video"
        v-model="formData.strVideo"
      />
      <AppSelect
        class="required-field"
        @select="onSelect('strCategory', $event)"
        id="strCategory"
        label="Category *"
        :items="categorySelectItems"
        v-model="formData.strCategory"
      />
      <span
        v-for="error in v$.strCategory.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      >
      <AppSelect
        class="required-field"
        @select="onSelect('strAlcoholic', $event)"
        id="strAlcoholic"
        label="strAlcoholic"
        :items="typeSelectItems"
        v-model="formData.strAlcoholic"
      />
      <span
        v-for="error in v$.strAlcoholic.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      >

      <AppInput id="strGlass" label="Glass" v-model="formData.strGlass" />
      <label for="strInstructions">Write instructions</label>
      <textarea
        class="required-field"
        id="strInstructions"
        label="Instructions"
        rows="5"
        cols="33"
        v-model="formData.strInstructions"
      >
      </textarea>
      <span
        v-for="error in v$.strInstructions.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      >

      <!-- <AppInput
          id="strInstructionsES"
          label="strInstructionsES"
          v-model="formData.strInstructionsES"
        />.required-field input {
          border-color: red;
        }
        .required-field label::after {
          content: '*';
          color: red;
          margin-left: 4px;
        }
        <AppInput
          id="strInstructionsDE"
          label="strInstructionsDE"
          v-model="formData.strInstructionsDE"
        />
        <AppInput
          id="strInstructionsFR"
          label="strInstructionsFR"
          v-model="formData.strInstructionsFR"
        />
        <AppInput
          id="strInstructionsIT"
          label="strInstructionsIT"
          v-model="formData.strInstructionsIT"
        /> -->
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 0)"
          id="strIngredient1"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient1"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure1"
          v-model="formData.strMeasure1"
        />
      </div>
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 1)"
          id="strIngredient2"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient2"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure2"
          v-model="formData.strMeasure2"
        />
      </div>
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 2)"
          id="strIngredient3"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient3"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure3"
          v-model="formData.strMeasure3"
        />
      </div>
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 3)"
          id="strIngredient4"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient4"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure4"
          v-model="formData.strMeasure4"
        />
      </div>
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 4)"
          id="strIngredient5"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient5"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure5"
          v-model="formData.strMeasure5"
        />
      </div>
      <div class="ingredient_wrapper">
        <SimpleTypeahead
          class="input"
          @selectItem="value => onIngredientSelect(value, 5)"
          id="strIngredient6"
          placeholder="Choose ingredient"
          label="Choose ingredient"
          v-model="formData.strIngredient6"
          :items="ingredients"
        />
        <AppInput
          placeholder="enter measures"
          id="strMeasure6"
          v-model="formData.strMeasure6"
        />
      </div>

      <AppButton :loading="loading" type="submit">Edit drink</AppButton>
      <!-- <AppButton :loading="loading" type="button">Cancel</AppButton> -->
    </AppForm>
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
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import AppForm from '../components/shared/form/AppForm.vue';
import AppInput from '../components/shared/form/AppInput.vue';
import AppSelect from '../components/shared/form/AppSelect.vue';
import AppButton from '../components/shared/AppButton.vue';
import { required } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import Modal from '../components/Modal.vue';
import DrinkImgUpdate from '../components//DrinkImgUpdate.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import { updateCocktailInfo, getCocktailById } from '../services/cocktails-api';
import SimpleTypeahead from 'vue3-simple-typeahead';
// import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
import { Icon } from '@iconify/vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const cocktail = ref({});
const $toast = useToast();
const ingredients = computed(() => {
  return store.getters['cocktails/getIngredientsList'];
});
const drink = ref({});
const previewImage = ref(null);
const modalActive = ref(false);
const file = ref(null);
const BASE_AVATAR_URL = computed(() => {
  if (cocktail.value && cocktail.value.strDrinkThumb) {
    const url = cocktail.value.strDrinkThumb;
    return url;
  }
});
const updatePreviewImage = image => {
  previewImage.value = image;
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
  // file.value = event.target.files[0];
  file.value = photo;
  modalActive.value = false;
};
onMounted(async () => {
  const drinkId = route.params.id;
  try {
    await store.dispatch('cocktails/getListIngredients');
    const result = await getCocktailById(drinkId);
    cocktail.value = { ...result } || {};

    formData.strDrink = cocktail.value.strDrink || '';
    // formData.strDrinkThumb = cocktail.value.strDrinkThumb || '';
    formData.strTags = cocktail.value.strTags || '';
    formData.strVideo = cocktail.value.strVideo || '';
    formData.strCategory = cocktail.value.strCategory || '';
    formData.strAlcoholic = cocktail.value.strAlcoholic || '';
    formData.strGlass = cocktail.value.strGlass || '';
    formData.strInstructions = cocktail.value.strInstructions || '';
    formData.strDrinkThumb = cocktail.value.strDrinkThumb || '';

    formData.strIngredient1 = cocktail.value.strIngredient1 || '';
    formData.strIngredient2 = cocktail.value.strIngredient2 || '';
    formData.strIngredient3 = cocktail.value.strIngredient3 || '';
    formData.strIngredient4 = cocktail.value.strIngredient4 || '';
    formData.strIngredient5 = cocktail.value.strIngredient5 || '';
    formData.strIngredient6 = cocktail.value.strIngredient6 || '';

    formData.strMeasure1 = cocktail.value.strMeasure1 || '';
    formData.strMeasure2 = cocktail.value.strMeasure2 || '';
    formData.strMeasure3 = cocktail.value.strMeasure3 || '';
    formData.strMeasure4 = cocktail.value.strMeasure4 || '';
    formData.strMeasure5 = cocktail.value.strMeasure5 || '';
    formData.strMeasure6 = cocktail.value.strMeasure6 || '';
  } catch (error) {
    console.log(error);
  }
});

// const onFileChange = event => {
//   file.value = event.target.files[0];
// };

const onIngredientSelect = (ingredient, index) => {
  const ingredientKey = `strIngredient${index + 1}`;

  formData[ingredientKey] = ingredient;
};

const typeSelectItems = reactive([
  //   { value: '', label: 'Type'},
  'Alcoholic',
  'Non alcoholic',
]);

const categorySelectItems = reactive([
  //   { value: '', label: 'Category' },
  'Ordinary Drink',
  'Cocktail',
  'Shake',
  'Other / Unknown',
  'Cocoa',
  'Shot',
  'Coffee / Tea',
  'Homemade Liqueur',
  'Punch / Party Drink',
  'Beer',
  'Soft Drink',
]);
// const onSelect = (field, value) => {
//   formData[field] = value;
// };

const formData = reactive({
  strDrink: '',
  strDrinkThumb: '',
  strTags: '',
  strVideo: '',
  strCategory: '',
  strAlcoholic: '',
  strGlass: '',
  strInstructions: '',
  strInstructionsES: '',
  strInstructionsDE: '',
  strInstructionsFR: '',
  strInstructionsIT: '',
  strIngredient1: '',
  strIngredient2: '',
  strIngredient3: '',
  strIngredient4: '',
  strIngredient5: '',
  strIngredient6: '',
  strMeasure1: '',
  strMeasure2: '',
  strMeasure3: '',
  strMeasure4: '',
  strMeasure5: '',
  strMeasure6: '',
});

const loading = ref(false);

const reset = () => {
  formData.strDrink = '';
  formData.strDrinkThumb = '';
  formData.strTags = '';
  formData.strVideo = '';
  formData.strCategory = '';
  formData.strAlcoholic = '';
  formData.strGlass = '';
  formData.strInstructions = '';
  formData.strInstructionsES = '';
  formData.strInstructionsDE = '';
  formData.strInstructionsFR = '';
  formData.strInstructionsIT = '';
  formData.strIngredient1 = '';
  formData.strIngredient2 = '';
  formData.strIngredient3 = '';
  formData.strIngredient4 = '';
  formData.strIngredient5 = '';
  formData.strIngredient6 = '';
  formData.strMeasure1 = '';
  formData.strMeasure2 = '';
  formData.strMeasure3 = '';
  formData.strMeasure4 = '';
  formData.strMeasure5 = '';
  formData.strMeasure6 = '';
};

const rules = computed(() => {
  return {
    strDrink: { required },
    strCategory: { required },
    strAlcoholic: { required },
    strInstructions: { required },
    strDrinkThumb: { required },
  };
});
const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const photo = file.value ? file.value : null;

  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    $toast.open({
      message: 'Please fill all required fields',
      type: 'error',
      position: 'top-right',
    });
  }
  if (isFormValid) {
    try {
      const drinkId = route.params.id;
      loading.value = true;

      const drink = await updateCocktailInfo(drinkId, formData, photo);
      router.push({ name: 'cocktail', params: { id: drinkId } });
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
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
.ingredient_wrapper {
  display: flex;
}
// .input {
//    height: 40px;
//   border: 2px solid $main-color;
//   border-radius: 4px;
//   color: red;
//   padding: 8px 12px;
//   font-size: 16px;
//   transition: border-color $time-function;

//   &:focus,
//   &:hover {
//     outline: none;
//     border-color: $accent-color;
//   }
// }
.input__wrap {
  width: 100%;
}
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
.required-field {
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

.error__red {
  color: red;
}
// .required-field .label::after {
//   content: '*';
//   color: red;
//   margin-left: 4px;
// }
// .simple-typeahead > input {
//   background-color: red;
// }
</style>
