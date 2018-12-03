<template>
  <div v-if="isLoading">Loding...</div>

  <div class="home container" v-else>
    <!-- <section class="main-display"> -->
    <header class="home-header">
      <img class="home-logo" src="../assets/img/logo1.svg">
      <router-link to="/dibs">
        <div v-if="user" class="dibs-container">
          <img class="dibs-logo" src="../assets/img/moneyWhite.svg">
          <!-- <i class="far fa-hand-peace"/> -->
          <span v-if="user.dibs.length" class="notification">{{user.dibs.length}}</span>
        </div>
      </router-link>
      <router-link to="/dibs/ansDibs">
        <div v-if="user" class="dibs-container">
          <i class="fas fa-shopping-basket"/>
          <span v-if="countOfDibsAns" class="notification">{{countOfDibsAns}}</span>
        </div>
      </router-link>
      <router-link to="/search">
        <i class="fas fa-search"/>
      </router-link>
    </header>
    <section class="home-content">
      <item-list class="item-list" :items="items"/>
    </section>
      <garage-footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/item-list.vue";
import garageFooter from "@/components/garage-footer.vue";

export default {
  name: "home",
  components: {
    itemList,
    garageFooter
  },
  data() {
    return {
      isLoading: true
    };
  },
  created() {
    this.$store.dispatch({ type: "loadItems" }).then(res => {
      console.log(res);

      console.log("got items in home");

      this.isLoading = false;
    });
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

<style lang="scss" scoped>
</style>
