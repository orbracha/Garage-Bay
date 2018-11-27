<template>
  <div class="item-container">
    <div v-if="!isLoaded">Loading...</div>
    <div else>
      <header>
        <span slot="leftArrow">
          <b>←</b>
        </span>
        <div class="content" slot="headline">
          <h3>{{currItem.title}}</h3>
          <span>Created at: {{currItem.createAt}}</span>
        </div>
        <span slot="optionalIcon">❤</span>
      </header>

      <img :src="currItem.img" alt="placeholder image">
      <div class="chatLink-container">
        <!-- <span @click="chatClicked">&#9993;</span> -->
        <router-link to="/chat">&#9993;</router-link>
        <p>Like it? Start chat</p>
      </div>

      <div class="details-container">
        <p>Description: {{currItem.desc}}</p>
        <p>Location: ***need to add***</p>
        <p>Condition: {{currItem.condition}}</p>
        <div class="seller-details flexSet">
          <img class="seller-img" :src="currSeller.img" alt="placeholder image">
          <div>
            <p>{{currSeller.nickname}} Seller rate:***need to add***</p>
            <p>Currently selling {{currSeller.itemList.length}} items</p>
          </div>
        </div>
        {{currSeller}}
        <google-map/>
      </div>
    </div>
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
    //TODO WITH REAL DATA:
    //after getting the item - get seller id=> set seller name, image, rate, how many current items
  },
  methods: {
    chatClicked() {
      console.log("chat link clicked");
      this.$router.push(`/chat`)
    }
  },
  computed: {
    imgSrc() {
      this.currSeller.img;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
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
.item-container {
  width: 90%;
  margin: 0 auto;
}
header {
  display: flex;
  background-color: #666666;
  color: #e8e8e8;
  align-items: center;
  justify-content: center;
}
img {
  width: 100%;
  height: auto;
}
.flexSet{
    display:flex;
    align-items: center;
}
</style>
