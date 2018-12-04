<template>
  <ul class="listed-items-thumbnail">
    <li v-for="(item,idx) in list" :key="idx" @click="itemClicked(item._id)">
      <div class="user-profile-thumbnail">
        <img class="img-thumb" :src="item.img">
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['list'],

  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    }
  }
};
</script>

<style>
</style>
