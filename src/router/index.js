import Vue from 'vue';
import VueRouter from 'vue-router';

import WelcomePage from '../components/welcome/welcome.vue';
import DashboardPage from '../components/dashboard/dashboard.vue';
import SignupPage from '../components/auth/signup.vue';
import SigninPage from '../components/auth/signin.vue';
import BooksPage from '../components/Books/List.vue';


import store from '../store/modules/user';

Vue.use(VueRouter);

// eslint-disable-next-line no-sparse-arrays
const routes = [
  { name: 'Welcome', path: '/', component: WelcomePage },
  { name: 'Signup', path: '/signup', component: SignupPage }, ,
  { name: 'SignIn', path: '/signin', component: SigninPage },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next('/signin');
      }
    },
  },
  { path: '/books', component: BooksPage },
];

export default new VueRouter({ mode: 'history', routes });
