<template>
   <section class="instructions">
    <h2 class="cocktail__instructions instructions">Instructions</h2>
        <p class="instructions__langs">choose the language</p>
        <InstructionsLang v-model="language" @update-language="updateLanguage"/>
        <p v-if="displayedInstructions" class="instructions__text">{{ displayedInstructions  }}</p>
        <p v-else class="instructions__text">There is no instructions is this language, please choose another one</p>
        <h2 v-if="props.cocktail.strGlass" class="cocktail__glass glass">Glass</h2>
        <p v-if="props.cocktail.strGlass" class="glass__text">
          Serve: {{ props.cocktail.strGlass }}
        </p>
        </section>
</template>

<script setup>

import { ref, computed  } from 'vue';
import InstructionsLang from './InstructionsLang.vue';
const props = defineProps({
  cocktail: {
    required: true,
    type: Object,
  },

});
const language = ref('en');

const updateLanguage = (lang) => {
  language.value = lang;
};

const displayedInstructions = computed(() => {
  const languageKey = language.value === 'en' ? '' : language.value.toUpperCase();
    return props.cocktail[`strInstructions${languageKey}`];
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss';
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