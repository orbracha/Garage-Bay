<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <item-list :items="items"/>
  </div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/item-list.vue";
// import itemService from "@/services/item-service.js";

export default {
  name: "home",
  components: {
    itemList,
    // itemService
  },
  created() {
    this.$store.dispatch({ type: "loadItems" });
  },
  computed: {
    items() {
      console.log(this.$store.getters.itemsToDisplay);
      return this.$store.getters.itemsToDisplay;
    },
  }
};
</script>

<style>

</style>
