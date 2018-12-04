<template>
  <div class="item-container">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <garage-header>
        <div class="content" slot="headline">
          <h3>{{currItem.title}}</h3>
          <span>Created at: {{currItem.createAt}})</span>
        </div>
        <span slot="optionalIcon">
          <router-link v-if="isLoggedUser" :to="`/item/edit/${currItem._id}`">
            <i class="far fa-edit"/>
          </router-link>
          <i v-else-if="loggedUser" class="fas fa-heart empty-heart"></i>
        </span>
      </garage-header>

      <section class="item-content">
        <div class="img-container">
          <img class="item-img" :src="currItem.img" alt="placeholder image">
        </div>
        <div class="details-container">
          <h3>
            {{currItem.title}}
            <span slot="optionalIcon">
              <router-link v-if="isLoggedUser" :to="`/item/edit/${currItem._id}`">
                <i class="far fa-edit"/>
              </router-link>
              <i v-else-if="loggedUser" class="fas fa-heart empty-heart"></i>
            </span>
            <span id="item-create">Listed : {{currItem.createAt | relativeTime}}</span>
          </h3>
          <h3>{{currItem.price}}$</h3>
          <p class="item-desc">{{currItem.desc}}</p>
          <p>
            <i class="fas fa-map-marker-alt"/>
            {{distance}} Km away
          </p>
          <p>Condition: {{currItem.condition}}</p>
          <div v-if="loggedUser" class="chatLink-container">
            <p class="catch-dibs">
              Like it? Dibs it!
              <button @click="sendDibs">
                <img class="home-logo" src="../assets/img/logo1.svg">
              </button>
            </p>
          </div>
          <footer class="seller-details">
            <div class="flex">
              <img class="seller-img" :src="currSeller.img" alt="placeholder image">
              <div class="seller-details-text flex column between">
                <router-link :to="'/user/' + currSeller._id">
                  <p>{{currSeller.nickname}}</p>
                </router-link>
                <p>
                  <span v-for="n in currSeller.rate" :key="n" class="fa fa-star checked"></span>
                  <span v-for="m in (5-currSeller.rate)" :key="m.num" class="fa fa-star"></span>
                </p>
                <p>Currently selling {{currSeller.itemList.length}} items</p>
              </div>
            </div>
            <div class="remove-btn-container" v-if="isLoggedUser">
              <button @click="removeItem">Remove Item</button>
            </div>
          </footer>
          <!-- <google-map/> -->
        </div>
      </section>
    </div>
    <garage-footer></garage-footer>
  </div>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
import garageFooter from "../components/garage-footer.vue";
import GoogleMap from "@/components/GoogleMap";

export default {
  name: "item-details",
  components: {
    GoogleMap,
    garageHeader,
    garageFooter
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
        this.getDistance();
      });
    });
  },
  methods: {
    sendDibs() {
      var item = this.currItem;
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
    },
    removeItem() {
      var item = this.currItem;
      this.$store.dispatch({ type: "removeItem", item }).then(() => {
        this.$router.push("/");
      });
    },
    chatClicked() {
      this.$router.push(`/chat`);
    },
    getDistance: async function() {
      var itemCoords = this.currItem.location;
      var userCoords = await this.$store.dispatch({ type: "getLocation" });
      console.log("USER COORDS", userCoords, "item coords:", itemCoords);
      this.distance = this.calcDistance(userCoords, itemCoords);
    },
    calcDistance(userCoords, itemCoords) {
      var R = 6371;
      // var dLat = deg2rad(lat2-lat1);
      var dLat = this.deg2rad(itemCoords.lat - userCoords.lat); // deg2rad below
      var dLon = this.deg2rad(itemCoords.lng - userCoords.lng);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(userCoords.lat)) *
          Math.cos(this.deg2rad(userCoords.lng)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d.toFixed(2);
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  },
  computed: {
    relativeTime(time) {
      moment(time).fromNow();
    },
    imgSrc() {
      this.currSeller.img;
    },
    isLoggedUser() {
      let loggedUserId = this.$store.getters.getLoggedUser._id;
      if (loggedUserId === this.currSeller._id) return true;
      return false;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
// .details-container {
//   margin: 10px 15px;
//   text-align: left;
// }
// .item-content {
//   margin: 70px 0;
// }
// .seller-img {
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   // margin: 20px;

//   object-fit: cover;
//   object-position: center right;
// }
// .seller-details {
//   margin-top: 15px;
//   height: 70px;

//   .seller-details-text {
//     margin-left: 12px;
//   }
// }
// .chatLink-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// }
// .chatLink-container span {
//   margin-right: 5px;
// }
// p {
//   margin: 0;
// }
// .checked {
//   color: orange;
// }
// img {
//   width: 100%;
//   height: auto;
// }
// .flexSet {
//   display: flex;
//   align-items: center;
// }
</style>
