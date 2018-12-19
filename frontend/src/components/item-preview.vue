<template>
  <li v-if="item && !isUserItem " class="item-preview-container">
    <section class="main-list-item" @click="itemClicked(item._id)">
      <div class="seller-preview" @click.stop="userClicked(seller._id)">
        <img class="seller-thumbnail" v-if="seller.img" :src="seller.img">
        <div>
          <h3>{{seller.nickname}}</h3>
          <div v-if="loggedUser">{{distance}} Km away</div>
        </div>
      </div>

      <div class="img-wrapper">
        <section>
          <i class="fas fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
          <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
        </section>
        <section v-if="isDibs">
          <img class="dibs-stamp" src="../assets/img/dibs_stamp.svg">
        </section>
        <img v-if="item.img" class="main-list-img" :src="item.img">
      </div>

      <div class="main-item-details">
        <div class="main-list-header">{{item.title}}</div>
        <div class="item-desc-prev">{{item.desc}}</div>
        <div>{{(item.price)? '$' +item.price:'FREE'}}</div>
      </div>
    </section>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  },

  methods: {
    toggleWishlist() {
      const id = this.item._id;
      if (!this.loggedUser) return this.$router.push(`/login`);
      this.$store.dispatch({ type: "toggleWishlist", id });
    },
    userClicked(sellerId) {
      this.$router.push(`/user/${sellerId}`);
    },
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    }
  },
  computed: {
    userWishlist() {
      if (this.loggedUser) return this.loggedUser.wishList;
    },
    isUserItem() {
      if (this.loggedUser)
        return this.loggedUser.itemList.some(id => id === this.item._id);
      return false;
    },
    isDibs() {
      if (this.item.callDibs) {
        return this.item.callDibs.length > 0;
      }
    },
    seller() {
      return this.item.user;
    },
    wishlist() {
      const id = this.item._id;
      if (!this.loggedUser) return;
      return this.loggedUser.wishList.some(itemId => {
        return itemId === id;
      });
    },
    distance() {
      let itemCoords = this.item.location;
      return this.$store.getters.getDistance(itemCoords);
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
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

