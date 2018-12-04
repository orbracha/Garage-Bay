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
          <i class="fas fa-heart empty-heart"></i>
        </span>
      </garage-header>

      <section class="item-content">
        <div class="img-container">
          <div v-if="isLoggedUser">
            <button @click="removeItem">Remove</button>
            <router-link :to="`/item/edit/${currItem._id}`"><i class="far fa-edit"/></router-link>
          </div>
          <img class="item-img" :src="currItem.img" alt="placeholder image">
        </div>
        <div v-if="isLoggedUser" class="chatLink-container">
          <router-link :to="'/chat/user/'+ currItem.sellerId">&#9993;</router-link>
          <p>Like it? Start chat</p>
        </div>
        <div class="details-container">
          <h3>{{currItem.title}}</h3>
          <p class="item-desc">{{currItem.desc}}</p>
          <p><i class="fas fa-map-marker-alt"/> {{distance}} Km away</p>
          <p>Condition: {{currItem.condition}}</p>
          <div class="seller-details">
            <img class="seller-img" :src="currSeller.img" alt="placeholder image">
            <div class="seller-details-text flex column between">
              <p>{{currSeller.nickname}}</p>
              <p>
                <span v-for="n in currSeller.rate" :key="n" class="fa fa-star checked"></span>
                <span v-for="m in (5-currSeller.rate)" :key="m.num" class="fa fa-star"></span>
              </p>

              <p>Currently selling {{currSeller.itemList.length}} items</p>
            </div>
          </div>
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
