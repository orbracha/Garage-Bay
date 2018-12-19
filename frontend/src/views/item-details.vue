<template>
  <div class="item-container flex column">
    <!-- <div v-if="!isLoaded">
      <img src="../assets/img/loader.gif" alt>
    </div>-->
    <img v-if="!isLoaded" class="loading" src="../assets/img/loader.gif" alt srcset>

    <template v-else class="item-container flex column">
      <header class="details-header flex row">
        <div class="header-content">
          <h3>{{currItem.title}}</h3>
          <span id="item-created">Listed : {{currItem.createAt | relativeTime}}</span>
          <div v-if="isLoggedUser" class="edit-btn-container">
            <router-link :to="`/item/edit/${currItem._id}`">
              <i class="far fa-edit edit-item"/>
            </router-link>
            <i @click="removeItem" class="far fa-trash-alt"></i>
          </div>
        </div>
        <router-link :to="'/user/'+ currSeller._id">
          <img class="details-seller-img" :src="currSeller.img" alt="placeholder image">
        </router-link>
      </header>
      <section class="item-content flex column">
        <div class="img-details-container" :style="{backgroundImage:`url(${currItem.img})`}">
          <img
            class="dibs-stamp"
            v-if="currItem.callDibs.length>0"
            src="../assets/img/dibs_stamp.svg"
            alt
            srcset
          >
        </div>
        <div class="details-container">
          <div>
            <div>
              <p class="item-desc">{{currItem.desc}}</p>
              <p>
                <i class="fas fa-map-marker-alt"/>
                {{distance}} Km away
              </p>
              <p>Condition: {{currItem.condition}}</p>
              <p class="price-bold">Price: {{(currItem.price)? '$'+currItem.price:'FREE'}}</p>
            </div>
            <div class="action-btn-container flex row">
              <section v-if="loggedUser && !isLoggedUser" class="heart">
                <i class="fas fa-heart empty-heart" v-if="!wishlist" @click.stop="toggleWishlist"></i>
                <i class="fas fa-heart full-heart" v-else @click.stop="toggleWishlist"></i>
              </section>
              <router-link v-if="loggedUser && !isLoggedUser" :to="'/chat/user/'+ currSeller._id">
                <i class="far fa-comment-alt"></i>
              </router-link>
              <button
                v-if="loggedUser && !isLoggedUser && !(currItem.callDibs.includes(loggedUser._id))"
                class="dibs-btn"
                @click="sendDibs"
              >Dib It!</button>
              <button v-if="!loggedUser" class="dibs-btn" @click="$router.push('/login')">Call dibs!</button>
            </div>
          </div>
          <google-map :itemCoords="currItem.location"/>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import GoogleMap from "@/components/GoogleMap";

export default {
  name: "item-details",
  components: {
    GoogleMap
  },
  data() {
    return {
      currItem: {},
      currSeller: {},
      isLoaded: false,
      distance: 0
    };
  },
  created() {
    var itemId = this.$route.params.id;
    this.$store.dispatch({ type: "getItemById", itemId }).then(item => {
      this.currItem = item;
      var userId = this.currItem.sellerId;
      this.$store.dispatch({ type: "getUserById", userId }).then(user => {
        this.currSeller = user;
        this.isLoaded = true;
        let itemCoords = this.currItem.location;
        this.distance = this.$store.getters.getDistance(itemCoords);
      });
    });
  },
  methods: {
    toggleWishlist() {
      const id = this.currItem._id;
      if (!this.loggedUser) return this.$router.push(`/login`);
      this.$store.dispatch({ type: "toggleWishlist", id });
    },
    sendDibs() {
      if (this.loggedUser) {
        let item = JSON.parse(JSON.stringify(this.currItem));
        item.callDibs.push(this.loggedUser._id);
        this.currItem.callDibs.push(this.loggedUser._id);
        this.$store.dispatch({ type: "editItem", item }).then(item => {
          delete item.user;
          this.$store.dispatch({
            type: "sendDibs",
            userId: this.loggedUser._id,
            rate:this.loggedUser.rate,
            item
          });
          var user = JSON.parse(JSON.stringify(this.loggedUser));
          user.dibsAns.unshift({
            isAns: false,
            item
          });
          this.$store.dispatch({ type: "updateUser", user });
        });
      } else this.$router.push("/login");
    },
    removeItem() {
      this.$swal({
        title: "Are you sure?",
        text: "You can't revert your action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes Delete it!",
        cancelButtonText: "No, Keep it!",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          this.$swal(
            "Deleted",
            "You successfully deleted this item",
            "success"
          );
          var item = this.currItem;
          this.$store.dispatch({ type: "removeItem", item }).then(() => {
            this.$router.push("/");
          });
        } else {
          this.$swal("Cancelled", "Your item is still intact", "info");
        }
      });
    },
    chatClicked() {
      this.$router.push(`/chat`);
    }
  },
  computed: {
    wishlist() {
      const id = this.currItem._id;
      if (!this.loggedUser) return;
      return this.loggedUser.wishList.some(itemId => {
        return itemId === id;
      });
    },
    relativeTime(time) {
      moment(time).fromNow();
    },
    imgSrc() {
      this.currSeller.img;
    },
    isLoggedUser() {
      if (this.loggedUser) {
        let loggedUserId = this.$store.getters.getLoggedUser._id;
        if (loggedUserId === this.currSeller._id) return true;
        return false;
      }
      return false;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.fa-comment-alt {
  padding-left: 8px;
  font-size: 1.6rem;
}
.price-bold {
  font-weight: 700;
}
</style>


