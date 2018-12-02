<template>
  <section>
    <section v-if="isLoadin">Loading...</section>
    <section v-else class="user-page">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <i v-if="isLoggedUser" class="fas fa-pen edit-user"></i>
        <h1>{{user.nickname}}'s Garage</h1>
        <div class="rating">
        <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
        <span v-for="x in 5-user.rate" :key="x" class="fa fa-star empty-star"></span>
        </div>
        <!-- <p>{{user.rate}}</p> -->
        <ul>
          <li v-for="(item,idx) in user.listedItems" :key="idx" @click="itemClicked(item._id)">
            <div class="user-profile-thumbnail">
              <img class="img-thumb" :src="item.img">
            </div>
          </li>
        </ul>
      </div>
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
      console.log(loggedUserId);
      const userId = this.$route.params.userId;
      console.log(loggedUserId);
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
          this.isLoadin = false;
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
