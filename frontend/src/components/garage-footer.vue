<template>
  <div class="footer" :class="{ open: isMenu }">
    <section class="footer-icons-wrapper">
      <router-link class="footer-item footer-item-1" to="/">
        <div @click="toggleMenu" class="flex row center">
          <i class="fas fa-home"></i>
          <p>Home</p>
        </div>
      </router-link>
      <router-link class="footer-item footer-item-4" :to="(user)? '/chat':'/login'">
        <div @click="toggleMenu" class="flex row center chat-footer">
          <i class="far fa-comment-alt"></i>
          <p>Chat</p>
          <span v-if="user && user.historyChat.length" class="chat-notification">{{user.historyChat.length}}</span>
        </div>
      </router-link>
      <router-link class="footer-item footer-item-5" to="/select-image/item">
        <div @click="toggleMenu" class="flex row center">
          <i class="fas fa-plus"></i>
          <p>Sell item</p>
        </div>
      </router-link>
      <router-link
        class="footer-item footer-item-3"
        v-if="user"
        :userId="user._id"
        :to="'/user/wishlist/'+user._id"
      >
        <div @click="toggleMenu" class="flex row center">
          <i class="far fa-heart"></i>
          <p>Wishlist</p>
        </div>
      </router-link>
      <router-link class="footer-item footer-item-3" v-else to="/login">
        <div @click="toggleMenu" class="flex row center">
          <i class="far fa-heart"></i>
          <p>Wishlist</p>
        </div>
      </router-link>
      <router-link class="footer-item footer-item-2 flex row" v-if="user" :to="'/user/'+user._id">
        <i class="fas fa-user">
          <span
            v-if="user.dibsAns.filter(ans=>ans.isAns).length || user.dibs.length "
            class="footer-notification"
          >{{user.dibsAns.filter(ans=>ans.isAns).length + user.dibs.length}}</span>
        </i>
        <p>My profile</p>
      </router-link>
      <router-link class="footer-item footer-item-2" v-else to="/login">
        <div @click="toggleMenu" class="flex row center">
          <i class="fas fa-user"></i>
          <p>My profile</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "garage-footer",
  methods: {
    toggleMenu() {
      this.$store.commit({ type: "toggleMenu" });
    }
  },
  computed: {
    isMenu() {
      return this.$store.state.isMenu;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
