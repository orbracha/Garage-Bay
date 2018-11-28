<template>
  <div class="home">
    <header>
      <div class="logo">Dibs</div>
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
*{
  box-sizing: border-box;
}
header {
  z-index: 2;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  background-color: grey;
  .logo {
    color: white;
    font-family: "Lobster", cursive;
    font-size: 3rem;
  }
}


</style>
