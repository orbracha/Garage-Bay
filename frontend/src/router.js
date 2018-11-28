import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import chatPage from './views/chat-page.vue';
import itemDetails from './views/item-details.vue';
import editItem from './views/edit-item.vue';
import whishlistPage from './views/wishlist-page.vue';


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
      path: '/item/edit/:id?',
      name: 'edit',
      component: editItem,
    },
    {
      path: '/wishlist/:id?',
      name: 'wishlist-page',
      component: whishlistPage,
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
