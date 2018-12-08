<template>
  <section>
    <chat-list :data="userMsgs"></chat-list>
    <garage-footer/>
  </section>
</template>

<script>
import chatList from "../components/chat-list.vue";
export default {
  data() {
    return {
      loggedUser: null,
      userMsgs: []
    };
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
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
              link: `/chat/user/${userDest}`
            });
          });
      });
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;
    this.$store
      .dispatch({ type: "loadRooms", userId: this.loggedUser._id })
      .then(() => {
        this.getUserMsgs();
      });
  },
  components: {
    chatList
  }
};
</script>

<style>
</style>
