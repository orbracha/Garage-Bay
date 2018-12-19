<template>
  <section class="user-page-container">
    <img v-if="isLoadin" class="loading" src="../assets/img/loader.gif" alt srcset>
    <section v-else class="user-page-content">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <div class="profile-info flex column">
          <h1>{{user.nickname}}{{(isLoggedUser)? '':'\'s Garage'}}</h1>
          <section v-if="isLoggedUser">
            <div class="edit-user flex row" @click="editUserClicked">
              <i class="far fa-edit"></i>
              <h3>Edit Profile</h3>
            </div>
            <a @click="logoutUser" class="logoutBtn">Logout</a>
          </section>
          <div class="rating" v-else>
            <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
            <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
          </div>
        </div>
      </div>
      <div class="tab-container" v-if="isLoggedUser">
        <sui-tab active-index="0">
          <sui-tab-pane :label="user.listedItems.length+''" title="My Garage">
            <items-thumbnail :list="user.listedItems"/>
          </sui-tab-pane>
          <sui-tab-pane :label="dibs.length+''" title="Dibs Requset">
            <dibs-page @removeItem="removeItem" :isDibs="false"/>
          </sui-tab-pane>
          <sui-tab-pane :label="(dibsAns.filter(ans=>ans.isAns).length)+''" title="Dibs Answer">
            <dibs-page @removeItem="removeItem" :isDibs="true"></dibs-page>
          </sui-tab-pane>
        </sui-tab>
      </div>
      <template v-else>
        <items-thumbnail :list="user.listedItems"/>
      </template>
      <event-feed v-if="user.events.length > 2" :events="user.events"></event-feed>
    </section>
  </section>
</template>

<script>
import userTab from "@/components/user-tab.vue";
import garageFooter from "@/components/garage-footer.vue";
import userService from "@/services/user-service.js";
import itemsThumbnail from "@/components/item-thumbnail.vue";
import eventFeed from "@/components/event-feed.vue";
import dibsPage from "@/views/dibs-page.vue";

export default {
  name: "home",
  components: {
    garageFooter,
    itemsThumbnail,
    eventFeed,
    userService,
    userTab,
    dibsPage
  },
  data() {
    return {
      user: null,
      isLoadin: true,
      isLoggedUser: false
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch({ type: "disconnentChat", user: this.user });
      this.$store.dispatch({ type: "logout" }).then(() => {
        this.$router.push("/");
      });
    },
    editUserClicked() {
      this.$router.push(`/user/edit/${this.user._id}`);
    },
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    removeItem() {
      this.setUser();
    },
    setUser() {
      const userId = this.$route.params.userId;
      const loggedUser = this.$store.getters.getLoggedUser;
      if (loggedUser) {
        const loggedUserId = this.$store.getters.getLoggedUser._id;
        if (userId === loggedUserId) this.isLoggedUser = true;
      }

      this.$store
        .dispatch({ type: "getUserById", userId })
        .then(user => {
          this.user = user;
          this.isLoadin = false;
        })
        .catch(err => console.log("EROOOOOR"));
    }
  },
  computed: {
    dibs() {
      return this.$store.getters.getLoggedUser.dibs;
    },
    dibsAns() {
      return this.$store.getters.getLoggedUser.dibsAns;
    }
  },

  watch: {
    "$route.params.userId": {
      handler() {
        this.isLoggedUser = false;
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

