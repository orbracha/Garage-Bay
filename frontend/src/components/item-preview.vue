<template>
  <li v-if="item">
    <div class="seller-preview" @click="userClicked(seller._id)">
      <img class="seller-thumbnail" v-if="item.img" :src="seller.img">
      <div>
        <h1>{{seller.nickname}}</h1>
          <span v-for="n in seller.rate" :key="n" class="fa fa-star checked"></span>
          <!-- <span v-for="x in 5-seller.rate" :key="x" class="fa fa-star empty-star"></span> -->

        <!-- <p>{{seller.rate}}</p> -->
      </div>
    </div>

    <section class="main-list-item" @click="itemClicked(item._id)">
      <div class="img-wrapper">
        <i class="far fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
        <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>     
        <i
          class="far fa-money-bill-alt"
          v-if="loggedUser._id!==item.sellerId"
          @click.stop="sendDibs"
        />
        <img class="main-list-img" :src="item.img">
        <!-- <img class="price-tag" :src="{{imgLink}}"> -->
      </div>

      <div class="main-item-details">
        <div class="main-list-header">{{item.desc}}</div>
        <div class="item-desc">{{item.desc}} {{item.desc}} {{item.desc}}</div>
        <div>${{item.price}}</div>
      </div>

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
    userClicked(sellerId) {
      console.log("seller clicked");
      this.$router.push(`/user/${sellerId}`);
    },
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    toggleWishlist() {
      if (!this.loggedUser) return this.$router.push(`/login`);
      const itemId = this.item._id;
      this.wishlist = !this.wishlist
      this.$store.dispatch({ type: "toggleWishlist", itemId })
   
      // console.log(" toggling  wishlist");
    },
    sendDibs() {
      var item = this.item;
      delete item.user;
      this.$store.dispatch({
        type: "sendDibs",
        userId: this.loggedUser._id,
        item
      });
      var user = JSON.parse(JSON.stringify(this.loggedUser));
      user.dibsAns.unshift({
        isAns: false,
        item
      });
      this.$store.dispatch({ type: "updateUser", user });
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
      // console.log("isItemInWishlist", isItemInWishlist);
      if (isItemInWishlist) this.wishlist = true;
    }
  }
};
</script>

<style lang="scss" scoped>

.fa-money-bill-alt {
  font-size: 50px;
  position: absolute;
  right: 0;
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

