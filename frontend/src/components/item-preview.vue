<template>
  <section>
    <li class="main-list-item" @click="itemClicked(item._id)">
      <div>

      </div>
      <img class="main-list-img" :src="item.img">
      <div class="main-item-details">
        <div class="main-list-header">{{item.desc}}</div>
        <div class="item-desc">{{item.desc}} {{item.desc}} {{item.desc}}</div>
        <div>${{item.price}}</div>

      </div>
      <hr>
    </li>
  </section>
</template>

<script>
import genericPrivew from '@/services/item-service.js';

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
hr{
  padding-bottom: 8px;
}
</style>

