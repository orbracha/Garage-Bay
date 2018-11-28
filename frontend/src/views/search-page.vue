<template>
  <div>
    <section v-if="isLoading">Loading</section>

    <section v-else>
      <div class="filter-container">
        <input type="text" v-model="filter.byTxt">
      </div>
      <div class="catagories-container">
        <div
          v-for="catagory in catagories"
          :key="catagory"
          @click="catagoryClicked(catagory)"
        >{{catagory}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "search-page",
  data() {
    return {
      catagories: [],
      itemsToDisplay: [],
      filter: {
        byTxt: "",
        byType: ""
      },
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch({ type: "getAllCatagories" }).then(catagories => {
      this.catagories = catagories;
      this.isLoading = false;
    });
  },
  methods: {
    catagoryClicked(catagory) {
      this.filter.byType = catagory;
    },
    filterItems() {
      var filter = this.filter;
      this.$store.dispatch({ type: "filterItems", filter });
    }
  },

  watch: {
    filter: {
      handler() {
        this.filterItems();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.catagories-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  div {
    border: 1px solid black;
    background-color: #333;
    color: white;
    padding: 10px;
    margin: 5px;
    width: fit-content;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
