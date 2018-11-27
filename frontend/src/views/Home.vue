<template>
  <div class="home">
    <item-list :items="items"/>
  </div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/item-list.vue";

export default {
  name: "home",
  components: {
    itemList,
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
