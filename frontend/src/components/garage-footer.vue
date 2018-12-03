<template>
  <div class="footer">
    <section class="footer-icons-wrapper">
      <router-link class="footer-item-1 flex row" to="/">
        <i class="fas fa-home"></i>
        <p>Home</p>
      </router-link>
      <router-link class="footer-item-4 flex row" to="/chat">
        <i class="far fa-comment-alt"></i>
        <p>Chat</p>
      </router-link>
      <router-link class="footer-item-5 flex row" to="/select-image/item">
        <i class="fas fa-plus"></i>
        <p>Sell item</p>
      </router-link>
      <router-link
        class="footer-item-3 flex row"
        v-if="user"
        :userId="user._id"
        :to="'/user/wishlist/'+user._id"
      >
        <i class="far fa-heart"></i>
        <p>Wishlist</p>
      </router-link>
      <router-link class="footer-item-3 flex row" v-else to="/login">
        <i class="far fa-heart"></i>
        <p>Wishlist</p>
      </router-link>
      <router-link class="footer-item-2 flex row" v-if="user" :to="'/user/'+user._id">
        <i class="fas fa-user"></i>
        <p>My profile</p>
      </router-link>
      <router-link class="footer-item-2 flex row" v-else to="/login">
        <i class="fas fa-user"></i>
        <p>My profile</p>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "garage-footer",
  computed: {
    user() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
