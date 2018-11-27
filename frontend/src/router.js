import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import chatApp from './views/chat-app.vue';
import itemDetails from './views/item-details.vue';
import forparams from './views/paramsDeleteLater.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/chat',
      name: 'chat',
      component: chatApp,
    },
    {
      path: '/item/:id',
      name: 'item-details',
      component: itemDetails,
    },
    {
      path: '/forparams',
      name: 'forParams',
      component: forparams,
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
