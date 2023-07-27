<template>
  <div>
    <Multiselect
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      id="strTags"
      label="Tags"
      placeholder="Pick some"
      :options="options"
      :modelValue="selectedTags"
      @update:modelValue="onTagsSelect"
      
    />
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect';
import { ref } from 'vue';
const { selectedTags } = defineProps(['selectedTags']);
const emit = defineEmits();
const options = ref([
        'IBA',
        'NewEra',
        'Classic',
        'Beach',
        'ContemporaryClassic',
        'Alcoholic',
        'Holiday',
        'Clear',
        'Sour',
        'Dairy',
        'simple',
        'classic',
        'refreshing',
        'Sweet',
        'Brazilian',
        'Cold',
        'Frozen',
        'Summer',
        'DateNight',
        'USA',
        'Winter',
        'Drunk',
        'DinnerParty',
        'StrongFlavor',
        'Christmas',
        'Citrus',
        'Halloween',
        'Lazy',
        'Sharp',
        'German',
        'Passion',
        'Fresh',
        'Refreshing',
        'Hangover',
        'Breakfast',
        'Adult',
        'Shot',
        'Bubbly',
        'Expensive',
        'Savory',
        'Green',
        'Asia',
        'Vegan',
        'Brunch',
        'Mild',
        'Colourful',
        'Nature',
        'Strong',
        'Vegetarian',
        'Fruity',
        'Dark',
        'Spanish',
        'Contemporary',
        'Modern',
      ])
const onTagsSelect = (tags) => {
  emit('update:selectedTags', tags);
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

