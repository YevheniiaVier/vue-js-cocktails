<!-- <template>
  <div>IngredientsPage</div>
  <AppInput @input="logChange" v-model="keyword" />
  <p>{{ keyword }}</p>
</template>

<script setup>
import { ref } from "vue";

import AppInput from "@/components/shared/form/AppInput.vue";

const keyword = ref("");
const loading = ref(false);
const emptySearch = ref(false);

const handleSearch = (data) => {
  keyword.value = data.inputValue;
  if (!keyword.value) {
    $toast.open({
      message: "Please enter something",
      type: "warning",
      position: "top-right",
    });
  }
  if (keyword.value) {
    searchCocktails(keyword.value);
  }
};

async function searchCocktails(query) {
  try {
    loading.value = true;
    await store.dispatch("cocktails/getAllIngredients", query);
  } catch (error) {
    console.log(error);
    $toast.open({
      message: error,
      type: "error",
      position: "top-right",
    });
  } finally {
    loading.value = false;
  }

  if (!searchedCocktails.value.length) {
    emptySearch.value = true;
    return;
  }
  emptySearch.value = false;
  return searchedCocktails;
}



</script>
<style lang="scss" scoped></style> -->
