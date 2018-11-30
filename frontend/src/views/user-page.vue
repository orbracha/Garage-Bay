<template>
  <section>
    <section v-if="isLoadin">Loading...</section>
    <section v-else class="user-page">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <i v-if="userProfile" class="fas fa-pen edit-user"></i>
        <div>
          <h1>{{user.nickname}}'s Garage</h1>
          <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
          <span v-for="n in 5-user.rate" :key="n" class="fa fa-star empty-star"></span>
          <!-- <p>{{user.rate}}</p> -->
        </div>
      </div>
      <ul class="listed-items-thumbnail">
        <li v-for="(item,idx) in user.listedItems" :key="idx">
          <div class="user-profile-thumbnail">
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
      isLoadin: true,
      userProfile: false,
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
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  margin: 0;
  background-image: url("../assets/img/garage-BG.jpg");
  height: 100vh;
  background-color: #858585;
}

.user-profile-preview {
  position: relative;
  background-color: rgba(255, 255, 255, 0.445);
  margin: 0 15px 0 15px;
  display: flex;
  flex-direction: row;
  padding: 12px;

  .user-profile-thumbnail {
    margin-right: 12px;
    height: 100px;
    width: 100px;
    border-radius: 500px;
  }

  .edit-user {
    position: absolute;

    color: white;
    font-size: 0.8rem;
    height: 30px;
    width: 30px;
    background-color: rgb(10, 94, 219);
    border-radius: 20px;
  }
  h1 {
    text-align: left;
    margin: 0;
  }
  p {
    text-align: left;
    margin: 0;
  }
}

.listed-items-thumbnail {
  padding: 0;
  margin: 15px;
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));

  img {
    border-radius: 12px;
    height: 100%;
    width: 100%;
    transition: 0.3s;
    object-fit: cover;
    box-shadow: 8px 8px 28px -6px rgba(0, 0, 0, 0.75);
  }
}
</style>
