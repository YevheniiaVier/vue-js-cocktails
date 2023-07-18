<template>
  <div class="instructions__flags">
    <button class="icon__btn" @click="setLang('en')">
      <Icon class="icon" icon="twemoji:flag-united-kingdom" />
    </button>
    <button class="icon__btn" @click="setLang('de')">
      <Icon class="icon" icon="twemoji:flag-germany" />
    </button>
    <button class="icon__btn" @click="setLang('it')">
      <Icon class="icon" icon="twemoji:flag-italy" />
    </button>
    <button class="icon__btn" @click="setLang('fr')">
      <Icon class="icon" icon="twemoji:flag-france" />
    </button>
  </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
const emit = defineEmits(['update-language']);

const language = ref('en');
const setLang = lang => {
  language.value = lang;
  emit('update-language', language.value);
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss';
.icon__btn {
  border: none;
  display: inline-flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.icon {
  width: 30px;
  height: 30px;
}
.instructions {
  padding: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 25px;
  text-align: center;
  &__text {
    margin-bottom: 20px;
    text-align: center;
  }
  &__flags {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-bottom: 15px;
   
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
