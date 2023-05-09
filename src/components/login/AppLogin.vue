<template>
  <AuthSection>
    <LoginContainer>
      <AppForm @submit="handleSubmit">
        <AppInput
          class="login__input"
          id="email"
          v-model="formData.email"
          label="Email"
          type="email"
        />
        <span
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="error__red"
          >{{ error.$message }}</span
        >
        <AppInput
          class="login__input"
          id="password"
          v-model="formData.password"
          label="Password"
          type="password"
        />
        <span
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="error__red"
          >{{ error.$message }}</span
        >

        <AppButton :loading="loading" type="submit">LogIn</AppButton>
      </AppForm>
    </LoginContainer>
  </AuthSection>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import AppForm from "../shared/form/AppForm.vue";
import AppInput from "../shared/form/AppInput.vue";
import AppButton from "../shared/AppButton.vue";
import useVuelidate from "@vuelidate/core";
import AuthSection from "../shared/AuthSection.vue";
import LoginContainer from "./LoginContainer.vue";
import { required, minLength, email } from "@vuelidate/validators";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import store from "../../store/index";

const router = useRouter();

const $toast = useToast();

const formData = reactive({
  email: "",
  password: "",
});
const reset = () => {
  formData.email = "";
  formData.username = "";
  formData.password = "";
  formData.confirmPassword = "";
};
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(5) },
  };
});
const v$ = useVuelidate(rules, formData);

const loading = ref(false);
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate();

  if (isFormValid) {
    try {
      loading.value = true;

      await store.dispatch("auth/login", formData);
      router.push({ name: "home" });
      reset();
    } catch (error) {
      console.log(error);

      $toast.open({
        message: error.response.data.message,
        type: "error",
        position: "top-right",
      });
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss";

.error {
  &__red {
    color: red;
  }
}
</style>
