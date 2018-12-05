<template>
  <section>
    <div v-if="isLoading">Loding...</div>
    <div class="home" v-else>
      <div class="info-section flex column">
        <!-- <div class="info-left">
          <div class="left-info-box">
            <h4>How
              <span class="lobster">dibs</span>works?
            </h4>
            <p>
              Find an item you like in the board. You can send instant message to the seller.
              If you want to buy the product, just
              <span class="lobster">call dibs</span> and the seller will see your rquest. Once the seller approved your call he will keep it for you for one week.
            </p>
          </div>
        </div>-->
        <h3 class="home-page-text">Check Out Our Best Selling Garages:</h3>
        <div class="carousel-container">
          <!-- <div class="carousel-header">Highest rated sellers</div> -->
          <garage-carousel v-if="user" :user="user"/>
        </div>
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
