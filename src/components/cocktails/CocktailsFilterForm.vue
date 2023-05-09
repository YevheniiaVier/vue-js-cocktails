<template>
  <AppForm class="form" @submit="handleSubmit">
    <AppSelect
      @select="onSelect"
      v-model="formData.category"
      :items="selectItems"
      class="form__select"
      id="category"
    />
    <AppInput
      id="searchInput"
      placeholder="search for cocktail"
      class="form__input"
      v-model="formData.searchInput"
    />
    <AppButton :loading="loading" type="submit" variant="primary" size="large"
      >SubmiTTT</AppButton
    >
  </AppForm>
</template>

<script setup>
import { ref, reactive } from "vue";
import AppButton from "../shared/AppButton.vue";
import AppInput from "../shared/form/AppInput.vue";
import AppForm from "../shared/form/AppForm.vue";
import AppSelect from "../shared/form/AppSelect.vue";
const emit = defineEmits(["submit", "onSelect"]);

const handleSubmit = () => {
  emit("submit", {
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
  searchInput: "",
  category: "",
});

const selectItems = reactive([
  { value: "", label: "Category", selected: true },
  "Alcoholic",
  "Non alcoholic",
]);

const onSelect = (value) => {
  emit("onSelect", value);
};
</script>
<style lang="scss" scoped></style>
