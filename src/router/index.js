import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {path: '/',name: 'home',component: HomeView,},
  {path: '/about',name: 'about',component: AboutView},
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next('/dashboard');
  } 
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } 
  else {
    next();
  }
});


export default router
