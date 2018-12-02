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
        var user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        // delete item.user;
        user.dibs.unshift({ item: item, from: fromUser });
        
        console.log("get dibs", user);
        this.$store.dispatch({ type: "updateUser", user });
      });
      eventBus.$on(GET_ANS, ans => {
        var user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        var dib = user.dibsAns.find(dib => dib.item._id === ans.dib.item._id);
        var dibIdx = user.dibsAns.findIndex(
          dib => dib.item._id === ans.dib.item._id
        );
        dib.isAns = true;
        dib.type = ans.type;
        user.dibsAns.splice(dibIdx, 1, dib);
        console.log("get ans", user);
        this.$store.dispatch({ type: "updateUser", user });
      });
      eventBus.$on(GET_CANCLE, dib => {
        var user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        var dibIdx = user.dibs.findIndex(
          currDib =>
            currDib.item._id === dib.item._id && currDib.from === dib.from
        );
        user.dibs.splice(dibIdx, 1);
        console.log("get cancle", user);
        this.$store.dispatch({ type: "updateUser", user });
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
