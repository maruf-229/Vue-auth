<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthToken } from '@/composables/useAuthToken'; 
import axios from '../axios';

const { setAuthToken } = useAuthToken();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const passwordConfirmationError = ref('');

const router = useRouter();

const register = async () => {
  // Clear previous error messages
  nameError.value = '';
  emailError.value = '';
  passwordError.value = '';
  passwordConfirmationError.value = '';

  try {
    const response = await axios.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    console.log(response.data);

    setAuthToken(response.data.token);
    router.push('/dashboard'); 
  } catch (error) {
    console.log(error.response.data);

    // Check if the response contains validation errors
    if (error.response && error.response.data.errors) {
      console.log(error.response.data.errors)
      const errors = error.response.data.errors;

      nameError.value = errors.name ? errors.name[0] : '';
      emailError.value = errors.email ? errors.email[0] : '';
      passwordError.value = errors.password ? errors.password[0] : '';
      passwordConfirmationError.value = errors.password_confirmation ? errors.password_confirmation[0] : '';
    } else {
      console.log("An unknown error occurred.");
    }
  }
};
</script>

<template>
  <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
          <div>
              <input v-model="name" type="text" placeholder="Name" required />
              <span v-if="nameError" style="color: red">{{ nameError }}</span>
          </div>
          <div>
              <input v-model="email" type="email" placeholder="Email" required />
              <span v-if="emailError" style="color: red">{{ emailError }}</span>
          </div>
          <div>
              <input v-model="password" type="password" placeholder="Password" required />
              <span v-if="passwordError" style="color: red">{{ passwordError }}</span>
          </div>
          <div>
              <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required />
              <span v-if="passwordConfirmationError" style="color: red">{{ passwordConfirmationError }}</span>
          </div>
          <button type="submit">Register</button>
      </form>
  </div>
</template>

