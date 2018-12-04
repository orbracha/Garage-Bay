<template>
  <header class="home-header">
    <div class="burger">
      <i class="fas fa-times" v-if="isMenu" @click="toggleMenu"></i>
      <i class="fas fa-bars" v-else @click="toggleMenu"></i>
    </div>

    <router-link to="/">
      <div class="logo-text">dibs</div>
    </router-link>

    <input type="text" placeholder=" Search item">

    <router-link to="/search">
      <i class="fas fa-search"/>
    </router-link>

    <router-link v-if="user" :to="'/user/'+user._id">
      <i class="fas fa-user"></i>
    </router-link>

    <router-link  v-else to="/login">
      <i class="fas fa-user"></i>
    </router-link>

  </header>
</template>

<script>
export default {
  methods:{
    toggleMenu(){
      this.$store.commit({type: 'toggleMenu'})
    }
  },
  computed:{
    isMenu(){
      return this.$store.state.isMenu
    },
    user(){
      return this.$store.getters.getLoggedUser
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
