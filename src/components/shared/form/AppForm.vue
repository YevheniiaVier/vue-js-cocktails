<template>
  <div class="form__wrapper">
    <form class="form" @submit.prevent="onSubmit">
      <slot></slot>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(['submit']);
const onSubmit = () => {
  emit('submit');
};
</script>
<style lang="scss" scoped>
@import '../../../assets/scss';
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  gap: 15px;
  padding: 20px;
}
.form__wrapper {
  display: flex;
  align-items: center;
}
</style>
