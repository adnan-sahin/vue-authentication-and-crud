import Vue from 'vue';
import VueRouter from 'vue-router';

import WelcomePage from '../pages/Welcome/Welcome.vue';
import DashboardPage from '../pages/Dashboard/Dashboard.vue';
import SignupPage from '../pages/Auth/Signup.vue';
import SigninPage from '../pages/Auth/Signin.vue';
import BookPage from '../pages/Book/List.vue';
import RolePage from '../pages/Roles/List.vue';
import NotFoundPage from '../pages/Error/NotFound.vue';
import NetworkIssuePage from '../pages/Error/NetworkIssue.vue';



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
    }
  },
  { name: 'Books', path: '/books', component: BookPage },
  { name: 'Roles', path: '/roles', component: RolePage },
  { name: '404', path: '/404', component: NotFoundPage, props: true },
  { name: 'NetworkIssue', path: '/network-issue', component: NetworkIssuePage },
  { path: '*', redirect: { name: 404, params: { resource: 'page' } } }
];

export default new VueRouter({ mode: 'history', routes });
