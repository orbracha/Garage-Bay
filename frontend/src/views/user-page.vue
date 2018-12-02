<template>
  <section>
    <section v-if="isLoadin">Loading...</section>
    <section v-else class="user-page">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <i v-if="userProfile" class="fas fa-pen edit-user"></i>
        <i v-if="userProfile" class="fas fa-pen edit-user"></i>
          <h1>{{user.nickname}}'s Garage</h1>
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <!-- <span v-for="x in 5-user.rate" :key="x" class="fa fa-star empty-star"></span> -->
          <!-- <p>{{user.rate}}</p> -->
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <!-- <span v-for="x in 5-user.rate" :key="x" class="fa fa-star empty-star"></span> -->
          <!-- <p>{{user.rate}}</p> -->
        <li v-for="(item,idx) in user.listedItems" :key="idx" @click="itemClicked(item._id)">
          <div class="user-profile-thumbnail">
            <img class="img-thumb" :src="item.img">
            <!-- <div class="hover-mask"> LALALA</div> -->
        <li v-for="(item,idx) in user.listedItems" :key="idx" @click="itemClicked(item._id)">
          <div class="user-profile-thumbnail">
            <img class="img-thumb" :src="item.img">
            <!-- <div class="hover-mask"> LALALA</div> -->
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
      isLoadin: true,
      userProfile: false,
      loggedUser: this.$store.getters.getLoggedUser,
      sellerId: null
    };
  },
  methods: {
    itemClicked(itemId) {
        this.userProfile = true;

        this.isLoadin = false;
      this.$router.push(`/item/details/${itemId}`);
    },
    setUser() {
      const userId = this.$route.params.userId;
      if (userId === this.loggedUser._id) {
        console.log("displaying logged user profile");
            this.isLoadin = false;
        this.userProfile = true;

        this.isLoadin = false;
      } else {
        var self = this;

        this.$store
          .dispatch({ type: "getUserById", userId })
          .then(user => {
            self.user = user[0];
            console.log(self.user);
            this.isLoadin = false;
          })
          .catch(err => console.log("EROOOOOR"));
      }
    console.log(this.loggedUser);
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
    console.log(this.loggedUser);
    this.setUser();
  }
};

</script>

<style lang="scss" scoped>


