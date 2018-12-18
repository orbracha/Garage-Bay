<template>
  <section class="edit-item-container">
    <div class="edit-form">
      <div>
        <img :src="currItem.img">
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Title">
          <el-input placeholder="Item's Name" v-model="currItem.title" required></el-input>
        </el-form-item>

        <el-form-item label="Category">
          <el-select v-model="currItem.category" placeholder="Home">
            <el-option v-for="catagory in catagories" :key="catagory" :value="catagory">{{catagory}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Condition">
          <el-select v-model="currItem.condition" placeholder="Used">
            <el-option value="likeNew">Like new</el-option>
            <el-option value="used">Used</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Description">
          <el-input type="textarea" :rows="4" placeholder="Detailed of the item" v-model="currItem.desc"></el-input>
        </el-form-item>

        <el-form-item label="Price">
          <!-- <p>Price</p> -->
          <el-input class="price-input" placeholder="Price" v-model="currItem.price" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveItem">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>

      <!-- <form class="form-text-container" @submit.prevent="saveItem">
        <el-input placeholder="Title" v-model="currItem.title" required></el-input>

        <el-select v-model="currItem.category" placeholder="Category">
          <el-option v-for="catagory in catagories" :key="catagory" :value="catagory">{{catagory}}</el-option>
        </el-select>

        <el-select v-model="currItem.condition" placeholder="Condition">
          <el-option value="likeNew">Like new</el-option>
          <el-option value="used">Used</el-option>
        </el-select>

        <el-input type="textarea" :rows="4" placeholder="Description" v-model="currItem.desc"></el-input>

        <p>Price</p>
        <el-input class="price-input" placeholder="Price" v-model="currItem.price" required></el-input>
        <el-button type="submit">Save</el-button>
      </form> -->

    </div>
  </section>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
import garageFooter from "../components/garage-footer.vue";
export default {
  data() {
    return {
      currItem: {
        title: "",
        category: "",
        desc: "",
        price: 0,
        img: "",
        condition: "",
        callDibs: []
      },
      isLoadingCat: false,
      catagories: []
    };
  },
  methods: {
    saveItem: async function() {
      console.log("submiting form");

      var item = JSON.parse(JSON.stringify(this.currItem));
      if (this.currItem._id) {
        this.$store.dispatch({ type: "editItem", item }).then(item => {
          this.$router.push(`/item/details/${item._id}`);
        });
      } else {
        var item = JSON.parse(JSON.stringify(this.currItem));
        item.createAt = Date.now();
        item.sellerId = this.$store.getters.getLoggedUser._id;
        item.location = await this.$store.dispatch({ type: "getLocation" });
        item.callDibs = [];
        this.$store.dispatch({ type: "addItem", item }).then(itemId => {
          this.$store.commit({ type: "resetNewUrl" });
          this.$router.push(`/item/details/${itemId}`);
        });
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
    } else {
      let item = {
        title: "",
        category: "",
        Description: "",
        price: 0,
        img: this.$store.getters.getImageUrl
      };
      this.currItem = item;
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
input {
  margin-bottom: 15px;
}
</style>


