<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import storageService, {
  LOGGEDIN_USER_KEY
} from "./services/storage-service.js";
import eventBus, {
  GET_MSG,
  GET_DIBS,
  GET_ANS,
  GET_CANCLE
} from "./services/eventBus-service.js";
export default {
  methods: {},
  created() {


    const credentials = storageService.load(LOGGEDIN_USER_KEY);
    if (credentials) {
       this.$store.commit({
        type: "connectSocket", 
        userId: this.$store.getters.getLoggedUser._id
      });
      eventBus.$on(GET_DIBS, (item, fromUser) => {
        this.$store.dispatch({ type: "loadDibs" });
      });
      eventBus.$on(GET_ANS, ans => {
        this.$store.dispatch({ type: "loadDibs" });
      });
      eventBus.$on(GET_CANCLE, dib => {
        this.$store.dispatch({ type: "loadDibs" });
      })
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100vh;
  margin: 0;
}
#nav {
  padding: 30px;
  padding-top: 80px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
