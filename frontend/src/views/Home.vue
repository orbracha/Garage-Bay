<template>
  <section>
    <div v-if="isLoading">Loding...</div>
    <div class="home" v-else>
      <div class="carousel-container">
        <div class="carousel-header">Highest rated sellers</div>
        <garage-carousel v-if="user" :user="user"/>
      </div>

      <section class="home-content">
        <item-list class="item-list" :items="items"/>
      </section>

    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/item-list.vue";
import garageCarousel from "@/components/garage-carousel.vue";
import menuScreen from "@/components/screen.vue";

export default {
  name: "home",
  components: {
    itemList,
    garageCarousel,
    menuScreen
  },
  data() {
    return {
      isLoading: true
    };
  },
  created() {
    this.$store.dispatch({ type: "loadItems" }).then(res => {
      this.isLoading = false;
    });
  },
  // methods: {
  //   toggleMenu() {
  //     this.isMenu = !this.isMenu;
  //     console.log(this.isMenu);
  //   }
  // },
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
