<template>
  <div class="home">
    <header class="home-header">
      <img class="home-logo" src="https://res.cloudinary.com/duxpc5ggn/image/upload/v1543466484/logo1.png" alt="">
      <!-- <div class="home-logo">Dibs</div> -->

      <i class="fas fa-search"></i>
    </header>
    <item-list :items="items"/>
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
  created() {
    this.$store.dispatch({ type: "loadItems" });
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


</style>
