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
  display: flex;

  gap: 15px;
  flex-direction: column;
  width: 360px;
}
.form__wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
}
</style>
