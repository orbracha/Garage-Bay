<template>
  <div class="item-container">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <garage-header>
        <div class="content" slot="headline">
          <h3>{{currItem.title}}</h3>
          <span>Created at: {{currItem.createAt}}</span>
        </div>
        <span slot="optionalIcon">❤</span>
      </garage-header>

      <img :src="currItem.img" alt="placeholder image">
      <div v-if="isLoggedUser">
        <!-- <button>Edit Item</button> -->
        <router-link :to="`/item/edit/${currItem._id}`">Edit Item</router-link>
      </div>
      <div v-else class="chatLink-container">
        <router-link :to="'/chat/user/'+ currItem.sellerId">&#9993;</router-link>
        <p>Like it? Start chat</p>
      </div>
      <div class="details-container">
        <p>Description: {{currItem.desc}}</p>
        <p>Location: {{distance}} Km</p>
        <p>Condition: {{currItem.condition}}</p>
        <div class="seller-details flexSet">
          <img class="seller-img" :src="currSeller.img" alt="placeholder image">
          <div>
            <p>{{currSeller.nickname}}</p>
            <span v-for="n in currSeller.rate" :key="n" class="fa fa-star checked"></span>
            <span v-for="m in (5-currSeller.rate)" :key="m.num" class="fa fa-star"></span>
            <p>Currently selling {{currSeller.itemList.length}} items</p>
          </div>
        </div>
        <!-- <google-map/> -->
      </div>
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
      isLoaded: false
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
      });
    });
  },
  methods: {
    chatClicked() {
      this.$router.push(`/chat`);
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
    imgSrc() {
      this.currSeller.img;
    },
    isLoggedUser() {
      let loggedUserId = this.$store.getters.getLoggedUser._id;
      if (loggedUserId === this.currSeller._id) return true;
      return false;
    },
    distance() {
      var userCoords = this.$store.getters.getLoggedUser.location;
      var itemCoords = this.currItem.location;
      console.log("USER COORDS", userCoords, "item coords:", itemCoords);
     var t= this.calcDistance(userCoords, itemCoords);
      return t;
    }
  }
};
</script>

<style lang="scss" scoped>
.details-container {
  margin: 10px 0;
  text-align: left;
}
.seller-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 20px;

  object-fit: cover;
  object-position: center right;
}
.chatLink-container {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.chatLink-container span {
  margin-right: 5px;
}
.checked {
  color: orange;
}
img {
  width: 100%;
  height: auto;
}
.flexSet {
  display: flex;
  align-items: center;
}
</style>
