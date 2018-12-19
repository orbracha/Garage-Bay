<template>
  <section class="chat-page-container">
    <img v-if="isLoading" class="loading-chat" src="../assets/img/loader.gif" alt srcset>
    <template v-else>
      <h1 v-if="!rooms.length">You don't have chats yet..</h1>
      <chat-list v-else :data="userRooms"></chat-list>
    </template>
  </section>
</template>

<script>
import chatList from "../components/chat-list.vue";
export default {
  data() {
    return {
      userRooms: [],
      isLoading: true,
      newMsgs: []
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
    getUserRooms() {
      console.log(this.rooms);
      var self = this;
      return this.rooms.map(room => {
        if (room.userId === this.loggedUser._id) var userDest = room.userDest;
        else var userDest = room.userId;
        console.log(userDest);
        this.$store
          .dispatch({ type: "getUserById", userId: userDest })
          .then(user => {
            self.userRooms.push({
              txt: room.historyMsgs.length
                ? room.historyMsgs[room.historyMsgs.length - 1].txt
                : "",
              title: user.nickname,
              img: user.img,
              link: `/chat/user/${userDest}`,
              isAvailable: user.isAvailable,
              isNewMsg: this.checkNewMsg(user._id)
            });
            this.isLoading = false;
            this.orderRooms();
          });
      });
    },
    checkNewMsg(id) {
      var isNewMsg = this.newMsgs.find(msg => {
        return msg.from._id === id;
      });
      if (isNewMsg) return true;
      return false;
    },
    orderRooms() {
      if (this.newMsgs.length) {
        for (let i = 0; i < this.userRooms.length; i++) {
          for (let j = 0; j < this.newMsgs.length; j++) {
            if (this.userRooms[i].title === this.newMsgs[j].nickname) {
              console.log("in");
              var currRoom = room;
              this.userRooms.splice(idx, 1);
              this.userRooms.unshift(currRoom);
              break;
            }
          }
        }
      }
    }
  },
  created() {
    window.scrollTo(0, 0);
    let user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
    this.newMsgs = user.historyChat;
    user.historyChat = [];
    this.$store.dispatch({ type: "updateUser", user }).then(() => {
      this.$store.dispatch({ type: "loadRooms", userId: user._id }).then(() => {
        if (this.rooms.length) this.getUserRooms();
        else this.isLoading = false;
      });
    });
  },
  components: {
    chatList
  }
};
</script>
<style lang="scss" scoped>
.loading-chat {
  display: block;
  margin: 20px auto;
  height: 50px;
  width: 50px;
}
</style>

