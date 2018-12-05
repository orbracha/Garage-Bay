<template>
  <header class="home-header flex row between baseline">
    <div class="left-icons flex row">
      <div class="logo-container flex row center">
        <div class="burger">
          <i class="fas fa-times" v-if="isMenu" @click="toggleMenu"></i>
          <i class="fas fa-bars" v-else @click="toggleMenu"></i>
        </div>

        <router-link to="/">
          <div class="logo-text">dibs</div>
        </router-link>
      </div>
      
    </div>
    <!-- <input type="text" placeholder=" Search item"> -->
    <router-link to="/search">
      <i class="fas fa-search"/>
    </router-link>

    <div class="header-icons-container">
      <!-- <router-link class="header-profile-icon" v-if="user" :to="'/user/'+user._id"/> -->
      <div v-if="user">
        <a @click="logoutUser" class="logoutBtn">Logout</a>
        <router-link class="header-profile-icon"  :to="'/user/'+user._id">
        <i class="fas fa-user"></i>
        <span
          v-if="user.dibsAns.filter(ans=>ans.isAns).length || user.dibs.length "
          class="notification"
        >{{user.dibsAns.filter(ans=>ans.isAns).length + user.dibs.length}}</span>
      </router-link>
      </div>

      <div v-else>
        <router-link class="header-profile-icon"  to="/login">
          <!-- <i class="fas fa-user"></i> -->Login
        </router-link> |
        <router-link class="header-profile-icon"  to="/signup">
          <!-- <i class="fas fa-user"></i> -->
          Signup
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      this.$store.commit({ type: "toggleMenu" });
    },
    logoutUser(){
      console.log('curr user is: ', this.user);
      this.$store.dispatch({type: 'logout'})
      .then(()=>{
        this.$router.push('/')
      })
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
.logoutBtn{
  cursor: pointer;
}
</style>
