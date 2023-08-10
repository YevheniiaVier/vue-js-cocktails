<template>
  <AppForm class="form" @submit="handleSubmit">
    <AppSelect
      v-if="!isByNamePage"
      @select="onSelect"
      v-model="formData.category"
      :items="selectItems"
      class="form__select"
      id="category"
    />
    <AppInput
      v-else
      id="searchInput"
      placeholder="search for cocktail"
      class="form__input"
      v-model="formData.searchInput"
    />
    <AppButton
      v-if="isByNamePage"
      :loading="loading"
      type="submit"
      variant="primary"
      size="large"
      >Search</AppButton
    >
  </AppForm>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppButton from '../shared/AppButton.vue';
import AppInput from '../shared/form/AppInput.vue';
import AppForm from '../shared/form/AppForm.vue';
import AppSelect from '../shared/form/AppSelect.vue';
const emit = defineEmits(['submit', 'onSelect']);
const route = useRoute();
const isByNamePage = computed(() => route.name === 'by-name');

const handleSubmit = () => {
  emit('submit', {
    category: formData.category,
    inputValue: formData.searchInput,
  });
};
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const formData = reactive({
  searchInput: '',
  category: '',
});

const selectItems = ref([
  { value: '', label: 'Type', selected: true },
  { value: 'Alcoholic', label: 'Alcoholic', selected: false },
  { value: 'Non alcoholic', label: 'Non alcoholic', selected: false },
]);

const onSelect = value => {
  emit('onSelect', value);
};

onMounted(() => {
  if (route.query.k) {
    formData.searchInput = route.query.k;
  }
  if (route.query.a) {
    selectItems.value.forEach(item => {
      if (route.query.a === 'Non_Alcoholic') {
        item.selected = item.value === 'Non alcoholic';
        return;
      }
      item.selected = item.value === route.query.a;
    });
  }
});

</script>
<style lang="scss" scoped></style>
