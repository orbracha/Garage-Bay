<template>
  <div class="footer">
    <router-link to="/">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link to="/chat">
      <i class="far fa-comment-alt"></i>
    </router-link>
    <router-link to="/item/edit">
      <i class="fas fa-plus"></i>
    </router-link>
    <router-link to="/wishlist">
      <i class="far fa-heart"></i>
    </router-link>
    <router-link v-if="user" :to="'/user'+user._id">
      <i class="fas fa-user"></i>
    </router-link>
    <router-link v-else to="/login">
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
