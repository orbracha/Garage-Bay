<template>
  <section class="chat-page-container">
    <img v-if="isLoading" class="loading-chat" src="../assets/img/loader.gif" alt="" srcset="">
    <chat-list v-else :data="userMsgs"></chat-list>
  </section>
</template>

<script>
import chatList from "../components/chat-list.vue";
export default {
  data() {
    return {
      userMsgs: [],
      isLoading: true
    };
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
  },
  methods: {
    getUserMsgs() {
      console.log(this.rooms);
      var self = this;
      return this.rooms.map(room => {
        if (room.userId === this.loggedUser._id) var userDest = room.userDest;
        else var userDest = room.userId;
        this.$store
          .dispatch({ type: "getUserById", userId: userDest })
          .then(user => {
            self.userMsgs.push({
              txt: room.historyMsgs[room.historyMsgs.length - 1].txt,
              title: user.nickname,
              img: user.img,
              link: `/chat/user/${userDest}`,
              isAvailable: user.isAvailable
            });
            this.isLoading = false;
          });
      });
    }
  },
  created() {
    this.$store
      .dispatch({
        type: "connentChat",
        user: this.$store.getters.getLoggedUser
      })
      .then(() => {
        let user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        user.historyChat = [];
        this.$store.dispatch({ type: "updateUser", user }).then(() => {
          this.$store
            .dispatch({ type: "loadRooms", userId: user._id })
            .then(() => {
              this.getUserMsgs();
            });
        });
      });
  },
  components: {
    chatList
  },
  destroyed() {
    this.$store.dispatch({ type: "disconnentChat", user: this.loggedUser });
  }
};
</script>
<style lang="scss" scoped>
.loading-chat{
  display: block;
  margin: 0 auto;
  height: 200px;
  width: 200px;
}
</style>

