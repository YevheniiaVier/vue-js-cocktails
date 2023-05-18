<template>
  <AuthSection>
    <LoginContainer>
      <AppForm @submit="handleSubmit">
        <AppInput id="name" v-model="formData.name" label="Username" />
        <span
          v-for="error in v$.name.$errors"
          :key="error.$uid"
          class="error__red"
          >{{ error.$message }}</span
        >

        <AppInput
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
        <AppInput
          id="confirmPassword"
          v-model="formData.confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <span
          v-for="error in v$.confirmPassword.$errors"
          :key="error.$uid"
          class="error__red"
          >{{ error.$message }}</span
        >
        <AppButton :loading="loading" type="submit">Register</AppButton>
      </AppForm>
    </LoginContainer>
  </AuthSection>
</template>

<script setup>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { reactive, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import AppForm from '../shared/form/AppForm.vue';
import AppInput from '../shared/form/AppInput.vue';
import AppButton from '../shared/AppButton.vue';
import AuthSection from '../shared/AuthSection.vue';
import LoginContainer from '../login/LoginContainer.vue';
import { useRouter } from 'vue-router';
import store from '../../store';

const router = useRouter();

const $toast = useToast();
const formData = reactive({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
});

const reset = () => {
  formData.email = '';
  formData.name = '';
  formData.password = '';
  formData.confirmPassword = '';
};
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(5) },
    name: { required, minLength: minLength(5) },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  };
});
const v$ = useVuelidate(rules, formData);

const loading = ref(false);
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  const { email, name, password } = formData;

  if (isFormValid) {
    try {
      loading.value = true;

      await store.dispatch('auth/registration', { email, name, password });
      router.push({ name: 'home' });
      reset();
    } catch (error) {
      console.log(error);

      $toast.open({
        message: error,
        type: 'error',
        position: 'top-right',
      });
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.error__red {
  color: red;
}
</style>
