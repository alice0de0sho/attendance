import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Menu from '../components/Menu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    //name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
