<template>
  <li v-if="item" class="item-preview-container">
    <section class="main-list-item" @click="itemClicked(item._id)">
      <div class="seller-preview" @click="userClicked(seller._id)">
        <img class="seller-thumbnail" v-if="item.img" :src="seller.img">
        <div>
          <h3>{{seller.nickname}}</h3>

          <span v-for="n in seller.rate" :key="n" class="fa fa-star checked"></span>
          <span v-for="x in 5-seller.rate" :key="x.idx" class="fa fa-star empty-star"></span>
        </div>
      </div>

      <div class="img-wrapper">
        <i class="fas fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
        <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
        <img class="main-list-img" :src="item.img">
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
export default {
  props: {
    item: Object
  },

  data() {
    return {
      loggedUser: null
    };
  },
  methods: {
    toggleWishlist() {
      if (!this.loggedUser) return this.$router.push(`/login`);
      const itemId = this.item._id;
      var user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
      const wishlistItemIdx = user.wishList.indexOf(itemId);
      console.log("wish list item index", wishlistItemIdx);
      if (wishlistItemIdx === -1) {
        user.wishList.push(itemId);
      } else {
        user.wishList.splice(wishlistItemIdx, 1);
      }

      this.$store.dispatch({ type: "updateUser", user });
    },

    userClicked(sellerId) {
      console.log("seller clicked");
      this.$router.push(`/user/${sellerId}`);
    },
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },


  },
  computed: {
    userWishlist() {
      if (this.loggedUser) return this.loggedUser.wishList;
    },
    seller() {
      return this.item.user;
    },
    wishlist() {
      const user = this.$store.getters.getLoggedUser;
      if (!user) return;
      return user.wishList.some(item => {
        return item === this.item._id;
      });
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;
  }
};
</script>

<style lang="scss" scoped>
.dibs-logo {
  height: 45px;
  padding: 7px;
  position: absolute;
  top: 12px;
  left: 12px;
}
.seller-preview {
  padding: 12px;
  padding-bottom: 5px;
  list-style-type: none;
  display: flex;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    margin: 0;
  }
  p {
    text-align: left;
    margin: 0;
  }
}
</style>

