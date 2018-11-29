<template>
  <li v-if="item">
    <div class="seller-preview" @click="sellerClicked(seller._id)">
      <img class="seller-thumbnail" v-if="item.img" :src="seller.img">
      <div>
        <h1>{{seller.nickname}}</h1>
        <p>{{seller.rate}}</p>
      </div>
    </div>

    <section class="main-list-item" @click="itemClicked(item._id)">
      <div class="img-wrapper">
        <i class="far fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
        <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
        <img class="main-list-img" :src="item.img">
      </div>

      <div class="main-item-details">
        <div class="main-list-header">{{item.desc}}</div>
        <div class="item-desc">{{item.desc}} {{item.desc}} {{item.desc}}</div>
        <div>${{item.price}}</div>
      </div>
      <hr>
    </section>
  </li>
</template>

<script>
// import genericPreview from "@/services/generic-preview.vue";

export default {
  props: {
    item: Object
  },

  data() {
    return {
      wishlist: false,
      loggedUser: null
    };
  },
  methods: {
    sellerClicked(sellerId) {
      console.log("seller clicked");
      // this.$router.push(`/seller/${sellerId}`);
    },
    itemClicked(itemId) {
      this.$router.push(`/item/${itemId}`);
    },
    toggleWishlist() {
      this.wishlist = !this.wishlist;
      const itemId = this.item._id;
      this.$store.dispatch({ type: "toggleWishlist", itemId })
      console.log(" toggling  wishlist");

      //   const wishlistItemIdx = this.userWishlist.indexOf(item => {
      //     return item === itemId;
      //   });
      //   if (wishlistItemIdx === -1) {
      //     this.loggedUser.wishList.push(itemId);
      //   } else {
      //     this.loggedUser.wishList.splice(wishlistItemIdx, 1);
      //     console.log("user after toggle", this.loggedUser);
      //   }
      //   console.log("added to wishlist");
      //   console.log("wishlist", this.wishlist);
      // }
    }
  },
  computed: {
    userWishlist() {
      return this.loggedUser.wishList;
    },
    seller() {
      return this.item.user;
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;

    const isItemInWishlist = this.userWishlist.some(item => {
      return item === this.item._id;
    });
    console.log("isItemInWishlist", isItemInWishlist);

    if (isItemInWishlist) this.wishlist = true;
  }
};
</script>

<style lang="scss" scoped>
hr {
  padding-bottom: 8px;
}
.seller-preview {
  padding: 12px;
  padding-bottom: 5px;
  list-style-type: none;
  display: flex;
  // margin-bottom: 5px;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h1 {
    text-align: left;
    margin: 0;
  }
  p {
    text-align: left;
    margin: 0;
  }
}
</style>

