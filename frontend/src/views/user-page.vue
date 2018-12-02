<template>
  <section>
    <section v-if="isLoadin">Loading...</section>
    <section v-else class="page-layout">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <div class="profile-info flec column">
          <i v-if="isLoggedUser" class="fas fa-pen edit-user"></i>
          <h1>{{user.nickname}}'s Garage</h1>
          <div class="rating">
            <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
            <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
          </div>
        </div>
      </div>

      <event-feed :events="user.events"></event-feed>
      <items-tumbnail :list="user.listedItems"/>
      <garage-footer/>
    </section>
  </section>
</template>

<script>
import garageFooter from "@/components/garage-footer.vue";
import userService from "@/services/user-service.js";
import itemsTumbnail from "@/components/item-thumbnail.vue";
import eventFeed from "@/components/event-feed.vue";

export default {
  name: "home",
  components: {
    garageFooter,
    itemsTumbnail,
    eventFeed,
    userService
  },
  data() {
    return {
      user: null,
      isLoadin: true,
      isLoggedUser: false
    };
  },
  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    setUser() {
      const loggedUserId = this.$store.getters.getLoggedUser._id;
      const userId = this.$route.params.userId;
      if (userId === this.loggedUserId) {
        console.log("displaying logged user profile");
        isLoggedUser: true;
      } else {
        console.log("displaying user profile");
      }
      var self = this;
      this.$store
        .dispatch({ type: "getUserById", userId })
        .then(user => {
          self.user = user;
          console.log(user);

          self.isLoadin = false;
        })
        .catch(err => console.log("EROOOOOR"));

      console.log(this.user);
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
    console.log(this.loggedUserId);
    this.setUser();
  }
};
</script>

<style lang="scss" scoped>
