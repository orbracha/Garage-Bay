<template>
  <div class="item-container">
    <div v-if="!isLoaded">Loading...</div>
    <template v-else>
      <header class="details-header flex">
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
      <section class="item-content">
        <div class="img-details-container" :style="{backgroundImage:`url(${currItem.img})`}"></div>
        <div class="details-container">
          <div>
            <div>
              <p class="item-desc">{{currItem.desc}}</p>
              <p>
                <i class="fas fa-map-marker-alt"/>
                {{distance}} Km away
              </p>
              <p>Condition: {{currItem.condition}}</p>
              <p>{{currItem.price}}$</p>
            </div>
            <div class="action-btn-container">
              <button class="dibs-btn" @click="sendDibs">Call dibs!</button>
              <i v-if="loggedUser && !isLoggedUser" class="fas fa-heart empty-heart"></i>
            </div>
          </div>
          <google-map :itemCoords="currItem.location"/>
        </div>
      </section>
    </template>
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
      if (this.loggedUser) {
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
      } else this.$router.push("/login");
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
    getDistance() {
      var itemCoords = this.currItem.location;
      var userCoords=this.$store.getters.getLoggedUser
      
      console.log('user coords', userCoords);
    console.log('item coords', itemCoords);
      // this.distance = this.$store.getDistance(userCoords, itemCoords);
    },
    // calcDistance(userCoords, itemCoords) {
    //   var R = 6371;
    //   // var dLat = deg2rad(lat2-lat1);
    //   var dLat = this.deg2rad(itemCoords.lat - userCoords.lat); // deg2rad below
    //   var dLon = this.deg2rad(itemCoords.lng - userCoords.lng);
    //   var a =
    //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //     Math.cos(this.deg2rad(userCoords.lat)) *
    //       Math.cos(this.deg2rad(userCoords.lng)) *
    //       Math.sin(dLon / 2) *
    //       Math.sin(dLon / 2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   var d = R * c; // Distance in km
    //   return d.toFixed(2);
    // },
    // deg2rad(deg) {
    //   return deg * (Math.PI / 180);
    // }
  },
  computed: {
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

