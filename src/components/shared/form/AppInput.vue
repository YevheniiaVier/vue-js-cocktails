<template>
  <div class="input__wrap">
    <label class="label" for="{{ id }}" v-if="label">{{ label }}</label>
    <input
      :id="id"
      class="input"
      :type="type"
      :value="modelValue"
      @input="onInput"
      v-bind="$attrs"
      autocomplete="off"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "blur"]);
const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
@import "../../../assets/scss";

label {
  margin-bottom: 10px;
  font-weight: 600;
}
.input__wrap {
  display: flex;
  flex-direction: column;
}
.input {
  border: 2px solid $main-color;
  border-radius: 4px;
  color: $accent-color;
  padding: 8px 12px;
  font-size: 14px;
  transition: border-color $time-function;
  width: 100%;
  height: 40px;

  &:focus,
  &:hover {
    outline: none;
    border-color: $accent-color;
  }
}
</style>
