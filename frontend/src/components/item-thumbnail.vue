<template>
  <ul class="items-thumbnail">
    <li v-for="(item,idx) in list" :key="idx" @click="itemClicked(item._id)">
      <div class="img-container">
        <img class="img-thumb" :src="item.img">
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["list"],

  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.items-thumbnail {
  padding: 20px;
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  .img-container {
    height: 100px;
    .img-thumb {
      // width: 100%;
      object-fit: cover;
    }
  }
}
</style>

