<template>
  <section>
    <div class="user-profile-preview">

      <img class="user-profile-thumbnail" :src="user.img">
      <div>
        <h1>dkdfjkdkjfodijf</h1>
        <h1>{{user.nickname}}</h1>
        <p>{{user.rate}}</p>
      </div>
    </div>

    <garage-footer/>

  </section>
</template>

<script>
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
      loggedUser: this.$store.getters.getLoggedUser,
      sellerId: null
    };
  },
<<<<<<< HEAD
=======
  computed: {
    user(){
      if(isMyProfile) return this.loggedUser
    }
  },

>>>>>>> f629131327ffc20c3330cc81b1d5d8d4e2519aff
  created() {
    const userId = this.$route.params.userId;
    console.log(userId);
    if (userId === this.loggedUser._id) {
      console.log("displaying logged user profile");
      return (this.isMyProfile = true);
    } else {
      
      this.sellerId = userId;
      console.log("displaying seller profile", this.sellerId);
    }
  },
  computed: {
    user() {
      if(this.sellerId) return userService.getById(this.sellerId)
      else return this.loggedUser
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
