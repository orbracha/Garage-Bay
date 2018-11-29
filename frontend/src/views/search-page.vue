<template>
  <div>
    <section v-if="isLoadingCat">Loading</section>

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
      <div class="items-container">
        <div v-if="isLoadingItems">Loading Items</div>
        <div v-else v-for="item in itemsToDisplay" :key="item._id">
            <img :src=item.img alt="" >
            <br>
            {{item.title}}</div>
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
      isLoadingCat: false,
      isLoadingItems: false
    };
  },
  created() {
    this.isLoadingCat = true;
    this.$store.dispatch({ type: "getAllCatagories" }).then(catagories => {
      this.catagories = catagories;
      this.isLoadingCat = false;
    });
  },
  methods: {
    catagoryClicked(catagory) {
      this.filter.byType = catagory;
    },
    filterItems() {
      this.isLoadingItems = true;
      var filter = this.filter;
      this.$store
        .dispatch({ type: "filterItems", filter })
        .then(itemsToDisplay => {
          this.itemsToDisplay = itemsToDisplay;
          this.isLoadingItems = false;
        });
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
.items-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div{
    background-color: #f5f5f0;
    border: 1px solid black;
    color: black;
    padding: 10px;
    margin: 5px;
    width: fit-content;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
