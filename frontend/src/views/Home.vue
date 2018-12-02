<template>
  <div v-if="isLoading">Loding...</div>
  
  <div class="home container" v-else>
    <!-- <section class="main-display"> -->
    <header class="home-header">
      <router-link to="/">
        <img
          class="home-logo"
          src="https://res.cloudinary.com/duxpc5ggn/image/upload/v1543466484/logo1.png"
        >
      </router-link>
      <router-link to="/search">
        <i class="fas fa-search"/>
      </router-link>
    </header>
    <item-list class="item-list" :items="items"/>
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
    this.$store.dispatch({ type: "loadItems" })
    .then(res => {
      console.log(res);
      
      console.log('got items in home');
      
      this.isLoading = false;
    });
  },
  computed: {
    items() {
      // console.log(this.$store.getters.itemsToDisplay);
      return this.$store.getters.itemsToDisplay;
    }
  }
};
</script>

<style lang="scss" scoped>
.fa-search {
  cursor: pointer;
}
</style>
