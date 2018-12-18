import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import chatPage from './views/chat-page.vue';
import loginPage from './views/login-page.vue';
import userChat from './views/user-chat.vue';
import wishPage from './views/wish-page.vue';
import itemDetails from './views/item-details.vue';
import editItem from './views/edit-item.vue';
import searchPage from './views/search-page.vue';
import userPage from './views/user-page.vue';
import selectImage from './views/select-image.vue';
import dibsPage from './views/dibs-page.vue';
import editUser from './views/edit-user.vue';
import signupPage from './views/signup-page.vue';

import Store from './store/store'


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
      path: '/login',
      name: 'login',
      component: loginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signupPage,
    },
    {
      path: '/dibs/:dibRoute?',
      name: 'dibsPage',
      component: dibsPage,
    },
    {
      path: '/select-image/:def?',
      name: 'select-image',
      component: selectImage,
      beforeEnter(to, from, next) {
        const loggedInUser = Store.getters.getLoggedUser;
        if (from.name !== 'signup' && !loggedInUser) return next('/login');
        next();
      }
    },

    {
      path: '/search',
      name: 'search',
      component: searchPage,
    },
    {
      path: '/chat',
      name: 'chat',
      component: chatPage,
    },
    {
      path: '/chat/user/:sellerId',
      name: 'user-chat',
      component: userChat,
    },
    {
      path: '/user/:userId',
      name: 'user-page',
      component: userPage,
    },
    {
      path: '/item/edit/:id?',
      name: 'edit',
      component: editItem,
    },
    {
      path: '/user/wishlist/:userId',
      name: 'wishlist',
      component: wishPage,
    },
    {
      path: '/user/edit/:userId',
      name: 'edit-user',
      component: editUser,
    },
    {
      path: '/item/details/:id',
      name: 'item-details',
      component: itemDetails,
    }
  ],
});
