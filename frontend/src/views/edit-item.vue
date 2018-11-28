<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>{{(currItem._id)? 'Edit':'Add'}}</h3>
      </div>
      <span slot="optionalIcon">&#x1f4f7;</span>
    </garage-header>

    <form @submit="saveItem">
      <label>
        <span>Title:</span>
        <input type="text" v-model="currItem.title" required>
      </label>
      <label>
        <span>Category:</span>
        <select v-model="currItem.category">
          <option value="music">Music</option>
          <option value="home">Home</option>
          <option value="kids">Kids</option>
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
  props: ["img"],
  data() {
    return {
      currItem: {
        title: "",
        category: "",
        Description: "",
        price: null,
        img: this.img
      }
    };
  },
  methods: {
    saveItem() {
      var item = JSON.parse(JSON.stringify(this.currItem));
      this.$store.dispatch({ type: "editItem", item });
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
</style>

