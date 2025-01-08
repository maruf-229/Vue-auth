import { ref, watch } from 'vue';

const authToken = ref(localStorage.getItem('authToken'));

watch(authToken, (newToken) => {
  if (newToken) {
    localStorage.setItem('authToken', newToken);
  } else {
    localStorage.removeItem('authToken');
  }
});

export function useAuthToken() {
  return {
    authToken,
    setAuthToken: (token) => {
      authToken.value = token;
    },
  };
}
