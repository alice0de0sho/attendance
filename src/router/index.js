import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Menu from '../components/Menu.vue';
import Month from '../components/Month.vue';
import Setting from '../components/Setting.vue';
import VacationApplication from '../components/VacationApplication.vue';

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
    props: true,
    children: [
      {
        path: 'month',
        name: 'Month',
        components: {
          sub: Month,
        },
      },
      {
        path: 'vacationapplication',
        name: 'VacationApplication',
        components: {
          sub: VacationApplication,
        },
      },
      {
        path: 'setting',
        name: 'Setting',
        components: {
          sub: Setting,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
