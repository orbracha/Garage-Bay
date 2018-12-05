<template>
  <header class="home-header">
    <div class="burger">
      <i class="fas fa-times" v-if="isMenu" @click="toggleMenu"></i>
      <i class="fas fa-bars" v-else @click="toggleMenu"></i>
    </div>

    <router-link to="/">
      <div class="logo-text">dibs</div>
    </router-link>

    <!-- <input type="text" placeholder=" Search item"> -->
    <router-link to="/search">
      <i class="fas fa-search"/>
    </router-link>
    <div class="header-icons-container">
      <template v-if="user">
        <router-link class="dibs-container" to="/dibs">
          <span v-if="user.dibs.length" class="notification">{{user.dibs.length}}</span>
          <i class="fas fa-donate"></i>
        </router-link>
        <router-link class="dibs-container" to="/dibs/dibsAns">
          <span
            v-if="user.dibsAns.filter(ans=>ans.isAns).length"
            class="notification"
          >{{user.dibsAns.length}}</span>
          <i class="fas fa-shopping-cart"></i>
        </router-link>
      </template>
      <router-link class="header-profile-icon" v-if="user" :to="'/user/'+user._id">
        <i class="fas fa-user"></i>
      </router-link>

      <router-link class="header-profile-icon" v-else to="/login">
        <i class="fas fa-user"></i>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
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
