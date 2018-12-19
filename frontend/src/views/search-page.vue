<template>
  <div class="page-layout">
    <!-- Dont delete! -->
    {{filterTxt}}
    <!-- Dont delete! -->
    <img v-if="isLoadingCat" class="loading" src="../assets/img/loader.gif" alt srcset>

    <section v-else>
      <div class="catagories-container">
        <div
          v-for="catagory in catagories"
          :key="catagory"
          @click="catagoryClicked(catagory)"
          v-if="catagory.length>1"
        >{{catagory}}</div>
      </div>
      <img v-if="isLoadingItems" class="loading" src="../assets/img/loader.gif" alt srcset>
      <items-thumbnail v-else :list="itemsToDisplay" class="search-res"/>
    </section>
  </div>
</template>

<script>
import itemsThumbnail from "@/components/item-thumbnail.vue";

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
      catagories = JSON.parse(JSON.stringify(catagories));
      this.catagories = catagories;
      this.catagories.unshift("All");
      this.isLoadingCat = false;
    });
  },
  methods: {
    catagoryClicked(catagory) {
      if (catagory === "All") catagory = "";
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
  computed: {
    filterTxt() {
      this.isLoadingItems = true;
      var txt = this.$store.getters.getFilterTxt;
      this.filter.byTxt = txt;
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
  },
  components: {
    itemsThumbnail
  }
};
</script>

<style lang="scss" scoped>
.page-layout {
  max-width: 1000px;
  margin: 0 auto;
}
.loading {
  text-align: center;
  margin-top: 10px;
  img {
    height: 100px;
    width: 100px;
  }
}
.catagories-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  div {
    text-align: center;
    background-color: #dbdbdb;
    box-shadow: 8px 8px 28px -6px rgba(0, 0, 0, 0.5);
    color: rgb(46, 46, 46);
    padding: 10px;
    margin: 5px;
    width: 77px;
    height: 40px;
    // width: fit-content;
    border-radius: 5px;
    &:hover {
      background-color: rgb(243, 243, 243);
      cursor: pointer;
    }
  }
}
.search-res {
  padding: 20px;
  margin-bottom: 40px;
}
</style>
