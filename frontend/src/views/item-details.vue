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
      <div class="chatLink-container" v-if="isLoggedUser">
        <router-link :to="'/chat/user/'+ currItem.sellerId">&#9993;</router-link>
        <p>Like it? Start chat</p>
      </div>
      <div class="details-container">
        {{currSeller}}
        <p>Description: {{currItem.desc}}</p>
        <p>Location: ***need to add distance***</p>
        <p>Condition: {{currItem.condition}}</p>
        <div class="seller-details flexSet">
          <img class="seller-img" :src="currSeller.img" alt="placeholder image">
          <div>
            <p>{{currSeller.nickname}}</p>

            <span v-for="n in currSeller.rate" :key="n" class="fa fa-star checked"></span>
            <!-- <span v-for="m in (5-currSeller.rate)" :key="m" class="fa fa-star"></span> -->
            <p>Currently selling {{currSeller.itemList.length}} items</p>
          </div>
        </div>
        <google-map/>
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
    }
  },
  computed: {
    imgSrc() {
      this.currSeller.img;
    },
    isLoggedUser() {
      let loggedUserId = this.$store.getters.getLoggedUser._id;
      if (loggedUserId === this.currSeller._id) return false;
      return true;
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
