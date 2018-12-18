<template>
  <section class="chat-page-container">
    <img v-if="isLoading" class="loading" src="../assets/img/loader.gif" alt srcset>
    <chat-list v-else :data="userRooms"></chat-list>
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
        this.$store
          .dispatch({ type: "getUserById", userId: userDest })
          .then(user => {
            self.userRooms.push({
              txt: room.historyMsgs[room.historyMsgs.length - 1].txt,
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
              console.log('in')
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
        this.getUserRooms();
      });
    });
  },
  components: {
    chatList
  }
};
</script>
<style lang="scss" scoped>
.loading {
  display: block;
  margin: 0 auto;
  height: 150px;
  width: 150px;
}
</style>

