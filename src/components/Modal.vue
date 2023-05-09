<template>
  <Transition name="modal-animation">
    <div v-if="modalActive" class="modal">
      <div ref="modalContent" v-if="modalActive" class="modal__inner">
        <slot></slot>
        <button type="button" class="modal__button" @click="onClose">
          <Icon
            class="close-icon"
            icon="material-symbols:close-rounded"
            color="#230312"
          />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

import { onClickOutside } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import AppButton from "./shared/AppButton.vue";
const modalContent = ref(null);
onMounted(() => {
  if (props.modalActive) {
    document.body.classList.add("modal-active");
  }
});

onUnmounted(() => {
  document.body.classList.remove("modal-active");
});

const emit = defineEmits(["close", "cancel"]);

const onClose = () => {
  emit("close", false);
};

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
onClickOutside(modalContent, () => {
  onClose();
});
watch(
  () => props.modalActive,
  (value) => {
    if (value) {
      document.body.classList.add("modal-active");
    } else {
      document.body.classList.remove("modal-active");
    }
  }
);
</script>

<style lang="scss" scoped>
@import "../assets/scss";

.modal-animation-enter-active,
.modal-animation-leave-active {
  @include transition(all);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: auto;
  overflow-y: auto;
  &__button {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(167, 141, 155);
    @include transition(background-color);
    &:hover {
      background-color: rgb(167, 141, 155);
    }
  }
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    position: absolute;
    overflow-y: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 380px;
    max-width: 600px;
    width: 80%;
    width: 100%;

    background-image: linear-gradient(
      -225deg,
      rgb(167, 141, 155, 0.9) 50%,

      #e3fdf5 50%
    );
    @media screen and (min-height: 10px) and (max-height: 450px) {
      top: 200px;
    }
  }
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.close-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.cancel {
  margin-top: 30px;
  width: 100px;
}
</style>
