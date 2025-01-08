<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthToken } from '@/composables/useAuthToken'; 
import axios from '../axios';

const { setAuthToken } = useAuthToken(); 
const user = ref({});
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('/user');
    user.value = response.data;
  } catch (error) {
    router.push('/login');
  }
});

const logout = () => {
  setAuthToken(null);
  router.push('/login');
};
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
