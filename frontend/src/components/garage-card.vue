<template>
  <div class="garage-card flex row between" @click="sellerClicked(user._id)">
    <div class="garage-card-content flex column">
      <img class="garage-card-user-img" :src="user.img">

      <div class="seller-info flex column">
        <h3>{{user.nickname}}'s </h3>
        <h3>Garage sale</h3>
        <div class="rating">
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
        </div>
      </div>
      <div>Selling: {{user.itemList.length}} items</div>
    </div>

    <!-- <div class="garage-card-content">
    </div>-->
    <div class="img-box flex wrap" >
      
      <img v-for="(item, idx) in user.listedItems" :key="idx" :src="item.img">
      <!-- <img :src="user.listedItems[1].img">
      <img :src="user.listedItems[2].img">
      <img :src="user.listedItems[3].img"> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    sellerClicked(id) {
      this.$router.push(`/user/${id}`);
    }
  }
};
</script>

<style>
</style>
