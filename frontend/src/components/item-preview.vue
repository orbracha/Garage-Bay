<template>
  <li v-if="item" class="item-preview-container">
    <section class="main-list-item" @click="itemClicked(item._id)">
      <div class="seller-preview" @click.stop="userClicked(seller._id)">
        <img class="seller-thumbnail" v-if="seller.img" :src="seller.img">
        <div>
          <h3>{{seller.nickname}}</h3>
          <div v-if="loggedUser">{{distance}} Km away </div>
     
        </div>
      </div>

      <div class="img-wrapper">
        <i class="fas fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
        <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
        <img v-if="item.img" class="main-list-img" :src="item.img" >
      </div>

      <div class="main-item-details">
        <div class="main-list-header">{{item.title}}</div>
        <div class="item-desc-prev">{{item.desc}}</div>
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

      if (wishlistItemIdx === -1) {
        user.wishList.push(itemId);
      } else {
        user.wishList.splice(wishlistItemIdx, 1);
      }

      this.$store.dispatch({ type: "updateUser", user });
    },

    userClicked(sellerId) {
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
    },
    distance(){
      let itemCoords=this.item.location
      return this.$store.getters.getDistance(itemCoords)
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

