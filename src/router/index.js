import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Menu from '../components/Menu.vue';
import Month from '../components/Month.vue';
import Setting from '../components/Setting.vue';
import VacationApplication from '../components/VacationApplication.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    //name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/menu',
    name: 'Menu',
    components: {
      default: Menu,
      sub: Month,
    },
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
