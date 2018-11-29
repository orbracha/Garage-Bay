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
        <!-- <img class="price-tag" :src="{{imgLink}}"> -->
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
      // imgLink:"https://res.cloudinary.com/duxpc5ggn/image/upload/v1543480967/la-06.png",
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
      if (!this.loggedUser) return this.$router.push(`/login`);
      this.wishlist = !this.wishlist;
      const itemId = this.item._id;
      this.$store.dispatch({ type: "toggleWishlist", itemId });
      console.log(" toggling  wishlist");
    }
  },
  computed: {
    userWishlist() {
      if (this.loggedUser) return this.loggedUser.wishList;
    },
    seller() {
      return this.item.user;
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;
    if (this.loggedUser) {
      const isItemInWishlist = this.userWishlist.some(item => {
        return item === this.item._id;
      });
      console.log("isItemInWishlist", isItemInWishlist);
      if (isItemInWishlist) this.wishlist = true;
    }
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

