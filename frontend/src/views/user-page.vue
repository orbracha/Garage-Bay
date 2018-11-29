<template>
  <section>
    <section class="user-preview">
      <div class="user-preview">
        <img class="user-thumbnail" :src="loggedUser.img">
        <div>
          <h1>{{loggedUser.nickname}}</h1>
          <p>{{loggedUser.rate}}</p>
        </div>
      </div>
      <garage-footer/>

      <!-- <div id="img-container" :style="{background:'green'}"></div> -->
      <!-- <img src="https://api.adorable.io/avatars/285/abott@adorable.png"> -->
      <!-- <div> -->
      <!-- <h1>{{user.nickname}}</h1>
      <p>{{user.nickname}}</p>-->
    </section>
    <ul class="items-thumbnail">
      <!-- <li v-for="item in user.itemList" :item="user.itemList" :key="item">{{item}}</li> -->
    </ul>
  </section>
</template>

<script>
// @ is an alias to /src
import garageFooter from "@/components/garage-footer.vue";
import userService from "@/services/user-service.js";

export default {
  name: "home",
  components: {
    garageFooter,
    userService
  },
  data() {
    return {
      isMyProfile: false,
      loggedUser: this.$store.getters.getLoggedUser
    };
  },
  computed: {
    user(){
      if(isMyProfile) return this.loggedUser
    }
  },

  created() {
    const userId = this.$route.params.userId;
    console.log(userId);
    if (userId === this.loggedUser._id) {
      console.log("displaying logged user profile");
      this.isMyProfile = true;
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-preview {
  display: inline;
}
.items-thumbnail {
  padding: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
