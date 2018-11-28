<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>Edit</h3>
      </div>
      <span slot="optionalIcon">&#x1f4f7;</span>
    </garage-header>
    <form @submit="saveItem">
      <label>
        <span>Title:</span>
        <input type="text">
      </label>
      <label>
        <span>Category:</span>
        <select>
          <option value="music">Music</option>
          <option value="home">Home</option>
          <option value="kids">Kids</option>
        </select>
      </label>
      <label>
        <span>Description:</span>
        <textarea cols="30" rows="10"></textarea>
      </label>
      <label>
        <span>Price:</span>
        <input type="number">
      </label>
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
export default {
  data() {
    return {
      currItem: {
        title: "",
        category: "",
        Description: "",
        price: null
      }
    };
  },
  methods: {
    saveItem() {
      this.$store.dispatch({ type: "saveItem", item: this.currItem });
    }
  },
  computed: {},
  created() {
    itemId = this.$router.params.id;
    if (itemId) {
      this.$store
        .dispatch({ type: "getItemById", itemId })
        .then(item => (this.currItem = item));
    }
  },
  components: {
    garageHeader
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

