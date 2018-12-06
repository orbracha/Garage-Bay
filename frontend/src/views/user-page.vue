<template>
  <section class="user-page-container">
    <section v-if="isLoadin">Loading...</section>
    <section v-else class="user-page-content">
      <div class="user-profile-preview">
        <img class="user-profile-thumbnail" :src="user.img">
        <div class="profile-info flex column">
          <i v-if="isLoggedUser" class="far fa-edit edit-user"></i>
          <h1>{{user.nickname}}{{(isLoggedUser)? '':'\'s Garage'}}</h1>
          <div class="rating">
            <span v-for="n in user.rate" :key="n" class="fa fa-star checked"></span>
            <span v-for="x in 5-user.rate" :key="x.idx" class="fa fa-star empty-star"></span>
          </div>
        </div>
      </div>
      <div class="tab-container" v-if="isLoggedUser">
        <sui-tab active-index="0">
          <sui-tab-pane :label="user.listedItems.length+''" title="My Garage">
            <items-tumbnail :list="user.listedItems"/>
          </sui-tab-pane>
          <sui-tab-pane :label="dibs.length+''" title="Dibs Requset">
            <dibs-page :isDibs="false"/>
          </sui-tab-pane>
          <sui-tab-pane :label="(dibsAns.filter(ans=>ans.isAns).length)+''" title="Dibs Answer">
            <dibs-page @removeItem="removeItem" :isDibs="true"></dibs-page>
          </sui-tab-pane>
        </sui-tab>
      </div>
      <template v-else>
        <items-tumbnail :list="user.listedItems"/>
      </template>
      <event-feed v-if="user.events.length > 2" :events="user.events"></event-feed>
    </section>
    <garage-footer/>
  </section>
</template>

<script>
import userTab from "@/components/user-tab.vue";
import garageFooter from "@/components/garage-footer.vue";
import userService from "@/services/user-service.js";
import itemsTumbnail from "@/components/item-thumbnail.vue";
import eventFeed from "@/components/event-feed.vue";
import dibsPage from "@/views/dibs-page.vue";

export default {
  name: "home",
  components: {
    garageFooter,
    itemsTumbnail,
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
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    },
    removeItem(){
      debugger
      this.getUser();
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
          console.log(user);

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
    console.log(this.user);
  }
};
</script>

<style lang="scss" scoped>
