<template>
  <GoBackButton @go-back="goBack" />
  <DrinkForm />
</template>

<script setup>
import DrinkForm from '../components/shared/form/DrinkForm.vue';
import AppContainer from '@/components/shared/AppContainer.vue';
import GoBackButton from '../components/shared/GoBackButton.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};
</script>

<style lang="scss">
@import '../assets/scss';
</style>
