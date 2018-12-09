<template>
  <div class="garage-card" @click="sellerClicked(user._id)">
    <div class="img-box">
      <img :src="user.header">
    </div>

    <div class="garage-card-content flex column">
      <img class="garage-card-user-img" :src="user.img">
      <div class="seller-info flex column">
        <h3>{{user.nickname}}'s Garage</h3>
        <h3>Specializes in {{user.desc}}</h3>
        <div class="rating">
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
        </div>
      </div>
      <div>Selling: {{user.listedItems.length}} items</div>
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
