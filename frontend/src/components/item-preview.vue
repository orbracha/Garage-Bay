<template>
  <section>
    <li class="main-list-item" @click="itemClicked(item._id)">
      <div class="img-wrapper">
        <i class="far fa-heart empty-heart" v-if="wishlist" @click.stop="toggleWishlist"></i>
        <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
        <img class="main-list-img" :src="item.img">
      </div>
      <div class="main-item-details">
        <div class="main-list-header">{{item.desc}}</div>
        <div class="item-desc">{{item.desc}} {{item.desc}} {{item.desc}}</div>
        <div>${{item.price}}</div>
      </div>
      <hr>
    </li>
  </section>
</template>

<script>
import genericPrivew from "@/services/item-service.js";

export default {
  props: {
    item: Object
  },
  data() {
    return {
      wishlist: false
    };
  },
  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    toggleWishlist() {
      this.wishlist = !this.wishlist;
      const itemId = this.item._id;
      this.$store.dispatch({ type: "toggleWishlist", itemId })
      .then(item => {
        console.log(item)     
      });

      console.log("added to wishlist");
      console.log("wishlist", this.wishlist);
    }
    // heartStatus() {

    // }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    userWishlist() {
      this.loggedUser.itemList;
    }
  },
  created() {
    if (
      userWishlist.some(item => {
        item === this.item.id;
      })
    )
      this.wishlist = true;
  }
};
</script>

<style lang="scss" scoped>
hr {
  padding-bottom: 8px;
}
</style>

