<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import eventBus, {
  GET_MSG,
  GET_DIBS,
  GET_ANS,
  GET_CANCLE
} from "./services/eventBus-service.js";
export default {
  methods: {},
  created() {
    if (this.$store.getters.getLoggedUser) {
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
        // var user = JSON.parse(
        //   JSON.stringify(this.$store.getters.getLoggedUser)
        // );
        // var dibIdx = user.dibs.findIndex(
        //   currDib =>
        //     currDib.item._id === dib.item._id && currDib.from === dib.from
        // );
        // user.dibs.splice(dibIdx, 1);
        // console.log("get cancle", user);
        // this.$store.dispatch({ type: "updateUser", user });
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100vh;

  text-align: center;
  color: #2c3e50;
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
