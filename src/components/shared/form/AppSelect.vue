<template>
  <select class="select" @change="onSelect" :id="id" v-bind="$attrs">
    <option
      v-for="item in formattedItems"
      :key="item.value"
      :value="item.value"
      :selected="item.selected"
    >
      {{ item.label }} 
    </option>
  </select>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  items: {
    required: true,
    type: Array,
  },
  id: {
    type: String,
    required: true,
  },
});
const formattedItems = computed(() => {
  return props.items.map((item) => {
    return typeof item === "object" ? item : { value: item, label: item };
  });
});
const emit = defineEmits(["select"]);
const onSelect = (event) => {
  const value = event.target.value;
  emit("select", value);
};
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/';
.select {
  border: 2px solid $main-color;
  border-radius: 4px;
  color: $accent-color;
  padding: 8px 12px;
  font-size: 16px;
  transition: border-color $time-function;
  width: 100%;

  /* background: transparent; */
  /* appearance: none; */

  &:focus,
  &:hover {
    outline: none;
    border-color: $accent-color;
  }
}
</style>
