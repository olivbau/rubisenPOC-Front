import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue'),
    },
    {
      path: '/train',
      name: 'train',
      component: () => import(/* webpackChunkName: "about" */ './views/Train.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.logged) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/secret',
      name: 'secret',
      component: () => import(/* webpackChunkName: "about" */ './views/Secret.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.logged) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
