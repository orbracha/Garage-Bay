<template>
  <section class="chat-container">
    <div class="chat-msgs">
      <div
        class="message"
        v-for="(msg,idx) in msgs"
        :key="idx"
        :class="{'loggedin-side': msg.from._id===loggedUser._id,'userChat-side': msg.from._id!==loggedUser._id}"
      >
        <img :src="msg.from.img" alt srcset>
        
        {{msg.txt}}
        <p class="msg-time">{{msg.createAt | relativeTime}}</p>
      </div>
    </div>
    <div class="chat-text">
      <form @submit.prevent="sendMsg">
        <input type="text" v-model="newMsg.txt" required>
        <button>Send</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newMsg: { from: "", txt: "", createAt: "" },
      loggedUser: null
    };
  },
  computed: {
    msgs() {
      return this.$store.getters.getMsgs;
    }
  },
  methods: {
    sendMsg() {
      console.log("send msg", this.newMsg);
      this.newMsg.from = {
        _id: this.loggedUser._id,
        nickname: this.loggedUser.nickname,
        img: this.loggedUser.img
      };
      this.newMsg.createAt = Date.now();
      var msg = JSON.parse(JSON.stringify(this.newMsg));
      this.$store
        .dispatch({ type: "sendMsg", msg, user: this.loggedUser })
        .then(() => (this.newMsg = { from: "", txt: "" }));
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;
    var userDest = this.$route.params.sellerId;
    this.$store.commit({
      type: "connectSocket",
      userId: this.loggedUser._id,
      userDest
    });
    this.$store.dispatch({
      type: "loadMsgs",
      userId: this.loggedUser._id,
      userDest
    });

    // this.$store.dispatch({
    //   type: "loadMsgs",
    //   userId: this.loggedUser._id,
    //   userDest
    // });
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
