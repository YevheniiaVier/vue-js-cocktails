<template>
    <form class="form" @submit.prevent="onChangePhoto">
      <div class="avatar">
        <button class="avatar__btn" type="button">
          {{ buttonText }}
          <Icon
            icon="material-symbols:attach-file-add-rounded"
            color="#230312"
            width="25"
            height="25"
          />
          <input @change="onFileChange" type="file" class="avatar__input" />
        </button>
        <button class="upload__btn" type="submit">
          <CircleLoader v-if="loading" />
          <Icon
            v-else
            icon="ic:baseline-cloud-upload"
            color="#230312"
            width="25"
            height="25"
          />
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  
  import { useStore } from "vuex";
  import { useToast } from "vue-toast-notification";
  import "vue-toast-notification/dist/theme-sugar.css";
  import CircleLoader from "./loaders/CircleLoader.vue";
  const store = useStore();
  
  const $toast = useToast();
  const buttonText = ref("Choose file to change your photo");
  const file = ref(null);
  const loading = ref(false);
  const previewImage = ref(null);
  
  
  
  const onFileChange = (event) => {
    file.value = event.target.files[0];
    if (file) {
      buttonText.value = file.value.name;
      previewImage.value = URL.createObjectURL(file.value);
      emit("onFileChoose", previewImage.value) 
    } else {
      buttonText.value = "Choose file to change photo";
      previewImage.value = null;
      emit("onFileChoose", null);
    }
  };
  const emit = defineEmits(["onChangePhoto", "onFileChoose"]);
  
  
  const onChangePhoto = async () => {
    //  await sendPhoto();
    emit("onChangePhoto", file.value);
    previewImage.value = null;
  };
  

  </script>
  
  <style lang="scss" scoped>
  .form {
    width: 80%;
    background-color: #0c7cbd;
  }
  .avatar {
    position: relative;
    width: 100%;
    display: flex;
  }
  .avatar__btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 5px;
    color: #fff;
    background-color: transparent;
    width: 85%;
    border: none;
    overflow: hidden;
    //   width: 100%;
  }
  .avatar__input {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  .upload__btn {
    position: absolute;
    height: 100%;
    width: 50px;
    cursor: pointer;
    top: 0;
    right: 0;
    border: none;
    background-color: transparent;
  }
  </style>
  