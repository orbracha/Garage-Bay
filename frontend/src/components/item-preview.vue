<template>
  <section>
    <li class="main-list-item" @click="itemClicked(item._id)">
      <div class="main-list-header">{{item.title}}</div>
      <!-- <div lass="main-list-img"></div> -->
      <img class="main-list-img" :src="item.img">
      <div class="main-item-details">
        <div>{{item.desc}}</div>
        <div>{{item.price}}</div>
        <!-- <div>{{item.desc}}</div> -->
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/${itemId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  &:hover {
    border: 2px solid gray;
  }
}

.main-list-img {
  //   background-color: greenyellow;
  height: 100%;
  width: 100%;
  object-fit: cover;
  // transition: 0.3s;
}
</style>

