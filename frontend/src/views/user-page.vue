<template>
  <section>
    <section v-if="!isLoadin">Loading...</section>
    <section v-else>
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <div>
          <h1>{{user.nickname}}</h1>
          <p>{{user.rate}}</p>
        </div>
      </div>
      <ul class="listed-items-thumbnail">
        <li v-for="(item,idx) in user.listedItems" :key="idx">
          <div class="user-profile-thumbnail" >
          <img class="img-thumb" :src="item.img">
          </div>
        </li>
      </ul>
      <garage-footer/>
    </section>
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
      user: null,
      isLoadin: false,
      loggedUser: this.$store.getters.getLoggedUser,
      sellerId: null
    };
  },
  methods: {
    setUser() {
      const userId = this.$route.params.userId;
      console.log(userId);
      if (userId === this.loggedUser._id) {
        console.log("displaying logged user profile");
        this.user = this.loggedUser;
      } else {
        var self = this;
        this.$store
          .dispatch({ type: "getUserById", userId })
          .then(user => {
            self.user = user[0];
            console.log(self.user);
            this.isLoadin = true;
          })
          .catch(err => console.log("EROOOOOR"));
      }
    }
  },
  watch: {
    "$route.params.userId": {
      handler() {
        this.setUser();
      },
      immediate: true
    }
  },

  created() {
    this.setUser();
    // setUser();
    // const userId = this.$route.params.userId;
    // console.log(userId);
    // if (userId === this.loggedUser._id) {
    //   console.log("displaying logged user profile");
    //    this.user = (this.isMyProfile = true);
    // } else {
    //   this.user = this.$store
    //     .dispatch({ type: "getUserById", userId })
    //     .then(user => {
    //       console.log(user);
    //     });
    // this.sellerId = userId;
    // console.log("displaying seller profile", this.sellerId);
    // }
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
