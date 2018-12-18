<template>
  <section>
    <img v-if="isLoading" class="loading" src="../assets/img/loader.gif" alt srcset>

    <!-- <div v-if="isLoading">Loding...</div> -->
    <div class="home" v-else>
      <div class="info-section flex column">
        <h1 class="home-page-text">Garage Sale Online</h1>
        <p class="home-page-pre">
          Search , Pick
          <span>&</span> Call Dibs!
        </p>
        <garage-carousel v-if="bestSellers" :bestSellers="bestSellers"/>
      </div>

      <section class="home-content">
        <item-list class="item-list" :items="items"/>
      </section>
    </div>
  </section>
</template>

<script>
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
    window.scrollTo(0, 0);
    this.$store.dispatch({ type: "loadItems" }).then(res => {
      this.isLoading = false;
    });
    this.$store.dispatch({ type: "getBestSellers" }).then(res => {
      this.best = false;
    });
  },

  computed: {
    items() {
      return this.$store.getters.itemsToDisplay;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    },
    bestSellers() {
      return this.$store.getters.bestSellers;
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
