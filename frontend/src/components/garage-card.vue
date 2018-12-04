<template>
  <div class="garage-card">
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
      <span class="right floated">
        <i class="heart outline like icon"></i>
        17 likes
      </span>
      <i class="comment icon"></i>
      3 comments
    </div>

  </div>

  <!-- <div class="ui card">
  <div class="ui slide masked reveal image">
    <img src="/images/avatar/large/jenny.jpg" class="visible content">
    <img src="/images/avatar/large/elliot.jpg" class="hidden content">
  </div>
  <div class="content">
    <a class="header">{{user.nickname}} &amp; Hess</a>
    <div class="meta">
      <span class="date">Created in Sep 2014</span>
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="users icon"></i>
      {{user.itemList.length}} Items for sale
    </a>
  </div>
  </div>-->
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style>
</style>
