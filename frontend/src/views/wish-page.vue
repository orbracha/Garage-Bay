<template>
  <section>
    <section class="page-layout">
      <section>
        <div class="wish-spacer">My Wishlist</div>
        <section v-if="isLoadin" class="loading">Loading...</section>
        <items-thumbnail v-else :list="wishlist"/>
      </section>
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
        .catch(err => console.log("ERROOOR"));
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
}
</script>

<style lang="scss" scoped>

.loading{
  color: white;
  padding-left: 20px;
}
.wish-spacer {
  // background-color: rgba(194, 125, 125, 0.521);
  text-align: left;
  padding: 20px;
  font-size: 1.3rem;
  color: rgb(255, 255, 255);
  font-weight: 700;
  margin-top: 40px;
  border-radius: 10px;
}
</style>
