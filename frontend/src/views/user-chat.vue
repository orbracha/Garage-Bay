<template>
  <section class="chat-container">
    <garage-header>
      <div slot="headline">
        <h3>User Chat</h3>
      </div>
      <span slot="optionalIcon">&#128172;</span>
    </garage-header>
    <div class="chat-msgs">
      <ul>
        <li v-for="(msg,idx) in msgs" :key="idx">{{msg.txt}}</li>
      </ul>
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
import garageHeader from "../components/garage-header.vue";
export default {
  data() {
    return {
      newMsg: { from: "", txt: "" },
      msgs: null,
      loggedUser: null
    };
  },
  computed: {},
  methods: {
    sendMsg() {
      console.log("send msg", this.newMsg);
      this.newMsg.from = {
        _id: this.loggedUser._id,
        nickname: this.loggedUser.nickname
      };
      var msg = JSON.parse(JSON.stringify(this.newMsg));
      this.$store
        .dispatch({ type: "sendMsg", msg, user: this.loggedUser })
        .then(() => (this.newMsg = { from: "", txt: "" }));
    }
  },
  created() {
    this.loggedUser = this.$store.getters.getLoggedUser;
    var sellerId = this.$route.params.sellerId;
    console.log(sellerId, this.loggedUser._id);
    this.$store.commit({ type: "connectSocket" });
    this.msgs = this.loggedUser.historyChat;
  },
  components: {
    garageHeader
  }
};
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  li {
    list-style-type: none;
  }
}
.chat-container {
  height: 100%;
}
.chat-msgs {
  height: 85%;
  background: lightgray;
}
.chat-text {
  display: flex;
  height: 5%;
  margin-bottom: 2px;
  form {
    width: 100%;
    height: 100%;
  }
  input {
    width: 80%;
    height: 100%;
  }
  button {
    height: 100%;
    width: 20%;
  }
}
</style>
