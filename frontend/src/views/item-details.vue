<template>
  <div class="item-container flex column">
    <div v-if="!isLoaded">Loading...</div>
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
          <img v-if="currItem.callDibs.length" src="../assets/img/logo1.svg" alt srcset>
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
              <p>{{currItem.price}}$</p>
            </div>
            <div class="action-btn-container">
              <button
                v-if="loggedUser && !isLoggedUser"
                class="dibs-btn"
                @click="sendDibs"
              >Call dibs!</button>
              <button v-if="!loggedUser" class="dibs-btn" @click="$router.push('/login')">Call dibs!</button>
              <i v-if="loggedUser && !isLoggedUser" class="fas fa-heart empty-heart"></i>
              <router-link v-if="loggedUser" :to="'/chat/user/'+ currSeller._id">&#128172;</router-link>
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
      var item = this.currItem;
      this.$store.dispatch({ type: "removeItem", item }).then(() => {
        this.$router.push("/");
      });
    },
    chatClicked() {
      this.$router.push(`/chat`);
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

