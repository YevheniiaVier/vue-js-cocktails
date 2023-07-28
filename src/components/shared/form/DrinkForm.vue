<template>
  <div>
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
      <div v-if="!isEditPage">
        <AppInput
          class="required-field"
          @change="onFileChange"
          type="file"
          id="strDrinkThumb"
          label="Drink photo *"
          v-model="formData.strDrinkThumb"
        />
        <span
          v-for="error in v$.strDrinkThumb.$errors"
          :key="error.$uid"
          class="error__red"
          >{{ error.$message }}</span
        >
      </div>
      <div v-else class="photo__wrapper">
        <AppInput
          class="img required-field"
          id="strDrinkThumb"
          label="Drink photo *"
          v-model="formData.strDrinkThumb"
          readonly
        />
        <button type="button" class="insert__btn" @click="onModalOpen">
          <Icon
            icon="material-symbols:attach-file-add-rounded"
            color="#230312"
            width="25"
            height="25"
          />
        </button>
      </div>
      <VueMultiselect
        @update:selectedTags="onTagsSelect"
        :selectedTags="formData.strTags"
      />

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
        :items="isEditPage ? categorySelectItemsEdit : categorySelectItems"
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
        :items="isEditPage ? typeSelectItemsEdit : typeSelectItems"
        v-model="formData.strAlcoholic"
      />
      <span
        v-for="error in v$.strAlcoholic.$errors"
        :key="error.$uid"
        class="error__red"
        >{{ error.$message }}</span
      >
      <AppSelect
        class="required-field"
        @select="onSelect('strGlass', $event)"
        id="strGlass"
        label="strGlass"
        :items="isEditPage ? glassSelectItemsEdit : glassSelectItems"
        v-model="formData.strGlass"
      />
      <label for="strInstructions">Write instructions *</label>
      <textarea
        class="required-field text-input"
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

      <label for="strInstructionsDE">Instructions in German</label>
      <textarea
        class="required-field text-input"
        id="strInstructionsDE"
        label="InstructionsDE"
        rows="5"
        cols="33"
        v-model="formData.strInstructionsDE"
      >
      </textarea>
      <label for="strInstructionsFR">Instructions in French</label>
      <textarea
        class="required-field text-input"
        id="strInstructionsFR"
        label="InstructionsFR"
        rows="5"
        cols="33"
        v-model="formData.strInstructionsFR"
      >
      </textarea>
      <label for="strInstructionsIT">Instructions in Italian</label>
      <textarea
        class="required-field text-input"
        id="strInstructionsIT"
        label="InstructionsIT"
        rows="5"
        cols="33"
        v-model="formData.strInstructionsIT"
      >
      </textarea>

      <div class="ingredient_wrapper">
        <vue3-simple-typeahead
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
        <vue3-simple-typeahead
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
        <vue3-simple-typeahead
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
        <vue3-simple-typeahead
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
        <vue3-simple-typeahead
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
        <vue3-simple-typeahead
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

      <AppButton
        :text="isEditPage ? 'Edit drink' : 'Add drink'"
        :loading="loading"
        type="submit"
      />
    </AppForm>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import AppForm from './AppForm.vue';
import AppInput from './AppInput.vue';
import AppSelect from './AppSelect.vue';
import AppButton from '../AppButton.vue';
import { required } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {
  addCocktail,
  updateCocktailInfo,
} from '../../../services/cocktails-api';
import VueMultiselect from './MultiSelect.vue';
import { Icon } from '@iconify/vue';
const emit = defineEmits(['onModalOpen']);

const store = useStore();
const router = useRouter();
const route = useRoute();
const $toast = useToast();
const ingredients = computed(() => {
  return store.getters['cocktails/getIngredientsList'];
});

const isEditPage = computed(() => route.name === 'edit-drink');
const onModalOpen = () => {
  emit('onModalOpen');
};
const props = defineProps({
  cocktail: {
    type: Object,
    default: {},
  },
  photoFile: {
    type: File,
  },
  photoName: {
    type: String,

  },
});

onMounted(async () => {
  console.log('props.photoName', props.photoName)
  console.log('formData.str', formData.strDrinkThumb)
  try {
    await store.dispatch('cocktails/getListIngredients');
    if (isEditPage) {
      const { cocktail } = props;
      formData.strDrink = cocktail.strDrink || '';
      formData.strTags = [];
      formData.strVideo = cocktail.strVideo || '';
      formData.strCategory = cocktail.strCategory || '';
      formData.strAlcoholic = cocktail.strAlcoholic || '';
      formData.strGlass = cocktail.strGlass || '';
      formData.strInstructions = cocktail.strInstructions || '';
      formData.strInstructionsIT = cocktail.strInstructionsIT || '';
      formData.strInstructionsDE = cocktail.strInstructionsDE || '';
      formData.strInstructionsFR = cocktail.strInstructionsFR || '';

      formData.strDrinkThumb = props.photoName ? props.photoName : cocktail.strDrinkThumb || '';

      formData.strIngredient1 = cocktail.strIngredient1 || '';
      formData.strIngredient2 = cocktail.strIngredient2 || '';
      formData.strIngredient3 = cocktail.strIngredient3 || '';
      formData.strIngredient4 = cocktail.strIngredient4 || '';
      formData.strIngredient5 = cocktail.strIngredient5 || '';
      formData.strIngredient6 = cocktail.strIngredient6 || '';

      formData.strMeasure1 = cocktail.strMeasure1 || '';
      formData.strMeasure2 = cocktail.strMeasure2 || '';
      formData.strMeasure3 = cocktail.strMeasure3 || '';
      formData.strMeasure4 = cocktail.strMeasure4 || '';
      formData.strMeasure5 = cocktail.strMeasure5 || '';
      formData.strMeasure6 = cocktail.strMeasure6 || '';
    }
  } catch (error) {
    console.log(error);
  }
});
const file = ref(null);

const onFileChange = event => {
  file.value = event.target.files[0];
};

const onIngredientSelect = (ingredient, index) => {
  const ingredientKey = `strIngredient${index + 1}`;
  formData[ingredientKey] = ingredient;
};

const onTagsSelect = selectedTags => {
  formData.strTags = selectedTags;
};

const typeSelectItems = reactive([
  { value: '', label: 'Type', selected: true },
  'Alcoholic',
  'Non alcoholic',
]);

const glassSelectItems = reactive([
  { value: '', label: 'Glass', selected: true },
  'Balloon Glass',
  'Beer Glass',
  'Beer mug',
  'Beer pilsner',
  'Brandy snifter',
  'Champagne flute',
  'Cocktail glass',
  'Coffee mug',
  'Collins glass',
  'Copper Mug',
  'Cordial glass',
  'Coupe Glass',
  'Highball glass',
  'Hurricane glass',
  'Irish coffee cup',
  'Jar',
  'Margarita/Coupette glass',
  'Margarita glass',
  'Martini Glass',
  'Mason jar',
  'Nick and Nora Glass',
  'Old-fashioned glass',
  'Parfait glass',
  'Pitcher',
  'Pint glass',
  'Pousse cafe glass',
  'Shot glass',
  'Whiskey Glass',
  'Whiskey sour glass',
  'White wine glass',
  'Wine Glass',
]);

const categorySelectItems = reactive([
  { value: '', label: 'Category', selected: true },
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
const typeSelectItemsEdit = reactive(['Alcoholic', 'Non alcoholic']);

const glassSelectItemsEdit = reactive([
  'Balloon Glass',
  'Beer Glass',
  'Beer mug',
  'Beer pilsner',
  'Brandy snifter',
  'Champagne flute',
  'Cocktail glass',
  'Coffee mug',
  'Collins glass',
  'Copper Mug',
  'Cordial glass',
  'Coupe Glass',
  'Highball glass',
  'Hurricane glass',
  'Irish coffee cup',
  'Jar',
  'Margarita/Coupette glass',
  'Margarita glass',
  'Martini Glass',
  'Mason jar',
  'Nick and Nora Glass',
  'Old-fashioned glass',
  'Parfait glass',
  'Pitcher',
  'Pint glass',
  'Pousse cafe glass',
  'Shot glass',
  'Whiskey Glass',
  'Whiskey sour glass',
  'White wine glass',
  'Wine Glass',
]);

const categorySelectItemsEdit = reactive([
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

const onSelect = (field, value) => {
  formData[field] = value;
};

const formData = reactive({
  strDrink: '',
  strDrinkThumb: props.photoName ? props.photoName : '',
  strTags: [],
  strVideo: '',
  strCategory: '',
  strAlcoholic: '',
  strGlass: '',
  strInstructions: '',
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
  formData.strTags = [];
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
      loading.value = true;
      console.log('isEditPage.value', isEditPage.value);
      if (!isEditPage.value) {
        await addCocktail(formData, file.value);
        router.push({ name: 'my-drinks' });
      } else if (isEditPage.value) {
        console.log('props.photoFile', props.photoFile);
        const photo = props.photoFile ? props.photoFile : null;
        console.log('photo', photo);
        const drinkId = route.params.id;
        await updateCocktailInfo(drinkId, formData, photo);
        router.push({ name: 'cocktail', params: { id: drinkId } });
      }

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
};
watch(props, (newProps) => {
  if (newProps.photoName) {
    formData.strDrinkThumb = newProps.photoName;
  }
});
</script>

<style lang="scss">
@import '../../../assets/scss/';
.multiselect {
  color: $main-color;
}

.ingredient_wrapper,
.tags__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $accent-color;
}
.text-input {
  font-size: 18px;
  color: $main-color;
}
.simple-typeahead-input {
  height: 100%;
  width: 100%;
  border: 2px solid $main-color;
  border-radius: 4px;
  color: $main-color;
  padding: 8px 12px;
  font-size: 16px;
  transition: border-color $time-function;
  width: 100%;
  outline: none;
  &:focus,
  &:hover {
    border-color: $accent-color;
  }
}

.simple-typeahead {
  height: 40px;
  border-radius: 4px;
}

.error__red {
  color: red;
}
</style>
