import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import BeforeSignInHeader from '../components/BeforeSignInHeader.vue';
import PostSignInHeader from '../components/PostSignInHeader.vue';
import Month from '../components/Month.vue';
import Setting from '../components/Setting.vue';
import VacationApplication from '../components/VacationApplication.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    //name: 'SignIn',
    components: {
      default: SignIn,
      header: BeforeSignInHeader,
    },
  },
  {
    path: '/signIn',
    name: 'SignIn',
    components: {
      default: SignIn,
      header: BeforeSignInHeader,
    },
  },
  {
    path: '/signUp',
    name: 'SignUp',
    components: {
      default: SignUp,
      header: BeforeSignInHeader,
    },
  },
  {
    path: '/menu',
    name: 'Menu',
    components: {
      default: Month,
      header: PostSignInHeader,
    },
  },
  {
    path: '/month',
    name: 'Month',
    components: {
      default: Month,
      header: PostSignInHeader,
    },
  },
  {
    path: '/vacationapplication',
    name: 'VacationApplication',
    components: {
      default: VacationApplication,
      header: PostSignInHeader,
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    components: {
      default: Setting,
      header: PostSignInHeader,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
