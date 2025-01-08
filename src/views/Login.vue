<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthToken } from '@/composables/useAuthToken'; 
import axios from '../axios';

const { setAuthToken } = useAuthToken(); 
const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    });
    setAuthToken(response.data.token);
    router.push('/dashboard');
  } catch (error) {
    alert('Login failed!');
  }
};
</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
