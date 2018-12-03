<template>
  <section>
    <section class="page-layout">
      <div class="wish-spacer"></div>
      <section v-if="isLoadin">Loading...</section>

      <items-tumbnail v-else :list="wishlist"/>
    </section>

    <garage-footer/>
  </section>
</template>

<script>
// @ is an alias to /src
import garageFooter from "@/components/garage-footer.vue";
import itemsTumbnail from "@/components/item-thumbnail.vue";

export default {
  name: "home",
  components: {
    garageFooter,
    itemsTumbnail
  },
  data() {
    return {
      isLoadin: true,
      wishlist: []
    };
  },
  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    getUserWhishlist() {
      const userId = this.$store.getters.getLoggedUser._id;
      var self = this;
      this.$store
        .dispatch({ type: "getUserWhishlist", userId })
        .then(user => {
          self.wishlist = user.wishlistItems;
          console.log(user);

          self.isLoadin = false;
        })
        .catch(err => console.log("EROOOOOR"));
    }
  },
  watch: {
    "$route.params.userId": {
      handler() {
        this.getUserWhishlist();
      },
      immediate: true
    }
  }

  // computed: {
  //   userId(){
  //     return this.$store.getters.loggedUser._id
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.user-preview {
  display: inline;
}
.items-thumbnail {
  padding: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.wish-spacer{
  height: 50px;
}
</style>
