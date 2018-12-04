<template>
  <div v-if="isLoading">Loding...</div>

  <div class="home" v-else>
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

      <router-link class="footer-item-2 flex row" v-if="user" :to="'/user/'+user._id">
        <i class="fas fa-user"></i>
      </router-link>

      <router-link class="footer-item-2 header-profile-icon" v-else to="/login">
        <i class="fas fa-user"></i>
      </router-link>
    </header>

    <div class="carousel-container">
      <div class="carousel-header">Highest rated sellers</div>
      <garage-carousel v-if="user" :user="user"/>
    </div>

    <section class="home-content">
      <item-list class="item-list" :items="items"/>
    </section>
    <menu-screen class="screen" :class="{ open: isMenu }" @click.native="toggleMenu"/>
    <garage-footer class="footer" :class="{ open: isMenu }"/>
  </div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/item-list.vue";
import garageFooter from "@/components/garage-footer.vue";
import garageCarousel from "@/components/garage-carousel.vue";
import menuScreen from "@/components/screen.vue";

export default {
  name: "home",
  components: {
    itemList,
    garageFooter,
    garageCarousel,
    menuScreen
  },
  data() {
    return {
      isLoading: true,
      isMenu: false
    };
  },
  created() {
    this.$store.dispatch({ type: "loadItems" }).then(res => {
      this.isLoading = false;
    });
  },
  methods: {
    toggleMenu() {
      this.isMenu = !this.isMenu;
      console.log(this.isMenu);
      
    }
  },
  computed: {
    items() {
      // console.log(this.$store.getters.itemsToDisplay);
      return this.$store.getters.itemsToDisplay;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    },
    countOfDibsAns() {
      return this.user.dibsAns.filter(dib => dib.isAns).length;
    }
  }
};
</script>

<style lang="scss">
.VueCarousel-navigation-next {
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.815) !important;
  font-size: 1.5rem;
}
.VueCarousel-navigation-prev {
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.815) !important;
  font-size: 1.5rem;
}
</style>
