<template>
  <div class="footer">
    <router-link  class="footer-item-1" to="/">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link class="footer-item-4" to="/chat">
      <i class="far fa-comment-alt"></i>
    </router-link>
    <router-link class="footer-item-5" to="/select-image/item">
      <i class="fas fa-plus"></i>
    </router-link>
    <router-link class="footer-item-3" v-if="user" :userId="user._id" :to="'/user/wishlist/'+user._id">
      <i class="far fa-heart"></i>
    </router-link>
      <router-link class="footer-item-3" v-else to="/login">
      <i class="far fa-heart"></i>
    </router-link>
    <router-link class="footer-item-2" v-if="user" :to="'/user/'+user._id">
      <i class="fas fa-user"></i>
    </router-link>
    <router-link class="footer-item-2" v-else to="/login">
      <i class="fas fa-user"></i>
    </router-link>
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
