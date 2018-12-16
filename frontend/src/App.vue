<template>
  <div id="app">
    <garage-header></garage-header>
    <router-view class="router-view"/>
    <menu-screen/>
    <garage-footer/>
  </div>
</template>
<script>
import storageService, {
  LOGGEDIN_USER_KEY
} from "./services/storage-service.js";
import eventBus, { GET_MSG, DIBS } from "./services/eventBus-service.js";
import garageFooter from "@/components/garage-footer.vue";
import garageHeader from "@/components/garage-header.vue";
import menuScreen from "@/components/screen.vue";

export default {
  components: {
    garageFooter,
    garageHeader,
    menuScreen
  },
  methods: {},
  created() {
    const credentials = storageService.load(LOGGEDIN_USER_KEY);
    if (credentials) {
      this.$store
        .dispatch({ type: "checkUser", user: credentials })
        .then(() => {
          this.$store.commit({
            type: "connectSocket",
            userId: this.$store.getters.getLoggedUser._id
          });
          eventBus.$on(DIBS, () => {
            this.$store.dispatch({ type: "loadChange" });
          });
          eventBus.$on(GET_MSG, msg => {
            this.$store.commit({ type: "addMsg", msg });
            this.$store.dispatch({ type: "loadChange" });
          });
        });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  min-height: 100vh;
  margin: 0;
}
#nav {
  padding: 30px;
  padding-top: 80px;
  a {
    font-weight: bold;
    color: rgb(46, 46, 46);
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
