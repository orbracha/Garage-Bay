import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import chatPage from './views/chat-page.vue';
import login from './views/login-page.vue';
import userChat from './views/user-chat.vue';
import wishPage from './views/wish-page.vue';
import itemDetails from './views/item-details.vue';
import editItem from './views/edit-item.vue';


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
      component: chatPage,
    },
    {
      path: '/chat/user',
      name: 'user-chat',
      component: userChat,
    },
    {
      path: '/item/edit/:id?',
      name: 'edit',
      component: editItem,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: wishPage,
    },
    {
      path: '/item/details/:id',
      name: 'item-details',
      component: itemDetails,
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
