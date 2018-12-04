<template>
  <div class="garage-card" @click="sellerClicked(user._id)">
    <div class="img-box flex wrap">
      <img :src="user.img">
      <img :src="user.img">
      <img :src="user.img">
      <img :src="user.img">
    </div>

    <div class="garage-card-content flex row">
      <img class="garage-card-user-img" :src="user.img">

      <div class="seller-info flex column">
        <div>{{user.nickname}}</div>
        <div class="rating">
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
        </div>
      </div>
    </div>

    <div class="garage-card-content">
      <div>Selling: {{user.itemList.length}} items</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods:{
      sellerClicked(id){
          this.$router.push(`/user/${id}`);
      }
  }
};
</script>

<style>
</style>
