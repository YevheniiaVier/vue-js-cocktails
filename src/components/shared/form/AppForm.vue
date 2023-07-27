<template>
  <div class="form__wrapper">
    <form class="form" @submit.prevent="onSubmit">
      <slot></slot>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(["submit"]);
const onSubmit = () => {
  emit("submit");
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss";
.form {
  /* display: flex;

  gap: 15px;
  flex-direction: column;
  width: 360px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  gap: 15px;
  padding: 20px;
}
.form__wrapper {
  display: flex;
  /* width: 100%; */
  align-items: center;
  /* padding: 20px; */
}
</style>
