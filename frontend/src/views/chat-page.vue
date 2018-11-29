<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>Chat Page</h3>
      </div>
      <span slot="optionalIcon">&#128172;</span>
    </garage-header>
    <generic-list :data="userMsgs"></generic-list>
    <garage-footer/>
  </section>
</template>

<script>
import msgService from "../services/msg-service.js";
import garageHeader from "../components/garage-header.vue";
import genericList from "../components/generic-list.vue";
import garageFooter from "@/components/garage-footer.vue";
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
        this.$store
          .dispatch({ type: "getUserById", userId: room.userDest })
          .then(user => {
            self.userMsgs.push({
              txt: room.historyMsgs[room.historyMsgs.length - 1].txt,
              title: user.nickname,
              img: user.img,
              link: `/chat/user/${room.userDest}`
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
    garageHeader,
    genericList,
    garageFooter
  }
};
</script>

<style>
</style>
