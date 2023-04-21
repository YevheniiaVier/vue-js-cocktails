<template>
  <form class="form" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
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
</style>
