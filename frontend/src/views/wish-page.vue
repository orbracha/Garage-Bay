<template>
  <section>
      <section class="wishlist-container">
        <h1 class="home-page-text">My Wishlist</h1>
        <section v-if="isLoadin" class="loading">Loading...</section>
        <items-thumbnail v-else :list="wishlist"/>
      </section>
    </section>
</template>

<script>
// @ is an alias to /src
import itemsThumbnail from "@/components/item-thumbnail.vue";

export default {
  name: "home",
  components: {
    itemsThumbnail
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
    getUserWishlist() {
      const userId = this.$store.getters.getLoggedUser._id;
      var self = this;
      this.$store
        .dispatch({ type: "getUserWishlist", userId })
        .then(user => {
          self.wishlist = user.wishlistItems;
          console.log(user);

          self.isLoadin = false;
        })
        .catch(err => console.log("ERROOOR"));
    }
  },
  watch: {
    "$route.params.userId": {
      handler() {
        this.getUserWishlist();
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wishlist-container{
  max-width: 1000px;
  margin: 0 auto;;

}

.loading{
  color: white;
  padding-left: 20px;
}
.wish-spacer {
  text-align: left;
  padding: 20px 20px 0 20px;
  font-size: 1.3rem;
  color: rgb(255, 255, 255);
  font-weight: 700;
  margin-top: 70px;
  border-radius: 10px;
}
</style>
