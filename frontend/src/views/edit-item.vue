<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>{{(currItem._id)? 'Edit':'Add'}}</h3>
      </div>
      <span slot="optionalIcon">&#x1f4f7;</span>
    </garage-header>

    <form @submit="saveItem">
      <img :src="currItem.img" >
      <label>
        <span>Title:</span>
        <input type="text" v-model="currItem.title" required>
      </label>
      <label>
        <span>Category:</span>
        <select v-if="catagories.length>0" v-model="currItem.category">
          <option v-for="catagory in catagories" :key="catagory" :value="catagory">{{catagory}}</option>
        </select>
      </label>
      <label>
        <span>Condition:</span>
        <select  v-model="currItem.condition">
          <option value="likeNew">Like new</option>
          <option value="used">Used</option>
        </select>
      </label>
      <label>
        <span>Description:</span>
        <textarea cols="30" rows="10" v-model="currItem.desc" required></textarea>
      </label>
      <label>
        <span>Price:</span>
        <input type="number" v-model="currItem.price" required>
      </label>
      
      <button>Save</button>
    </form>
    <garage-footer></garage-footer>
  </section>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
import garageFooter from "../components/garage-footer.vue";
export default {
  // props: ["img"],
  data() {
    return {
      currItem: {
        title: "",
        category: "",
        Description: "",
        price: 0,
        img: ""
      },
      isLoadingCat: false,
      catagories:[]
    };
  },
  methods: {
    saveItem() {
      var item = JSON.parse(JSON.stringify(this.currItem));
      if(this.currItem._id){
        this.$store.dispatch({ type: "editItem", item });
      }
      else{
        
        var item = JSON.parse(JSON.stringify(this.currItem))
        item.createdAt=Date.now()
        item.sellerId=this.$store.getters.getLoggedUser
        // item.location= get location from google geo
        
        this.$store.dispatch({ type: "addItem", item });
        
        
      }
      
    }
  },
  computed: {},
  created() {
    var itemId = this.$route.params.id;
    if (itemId) {
      this.$store
        .dispatch({ type: "getItemById", itemId })
        .then(item => (this.currItem = item));
    }
    else{
      let item={
        title: "",
        category: "",
        Description: "",
        price: 0,
        img: this.$store.getters.getImageUrl
      }
      this.currItem=item;
    }
       this.isLoadingCat = true;
    this.$store.dispatch({ type: "getAllCatagories" }).then(catagories => {
      this.catagories = catagories;
      this.isLoadingCat = false;
    });
  },
  components: {
    garageHeader,
    garageFooter
  }
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin: 5px auto;
  span {
    display: block;
    margin: 5px auto;
  }
}
form{
  margin-bottom: 70px;
  img{
    width: 200px;
    margin-top:20px;
  }
}
</style>

