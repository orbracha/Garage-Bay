<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>Chat Page</h3>
      </div>
      <span slot="optionalIcon">&#128172;</span>
    </garage-header>
    <!-- <generic-list :data="rooms"></generic-list> -->
    {{rooms}}
    {{userMsgs}}
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
      return this.$store.getters.getRooms.map(room => {
        this.$store
          .dispatch({ type: "getUserById", userId: room.userDest })
          .then(user => user);
        // var currMsg = room.historyMsgs[room.historyMsgs.length - 1];
        // if (currMsg.from._id !== this.loggedUser._id) {
        //   return {
        //     title: currMsg.from.nickname,
        //     txt: currMsg.txt,
        //     img: currMsg.from.img
        //   };
        // }
      });
    }
  },
  methods: {
    getUserMsgs() {
      this.rooms.map(room => {
        return this.$store
          .dispatch({ type: "getUserById", userId: room.userDest })
          .then(user => {
            return this.userMsgs.push({
              title: user.nickname,
              img: user.img,
              txt: room.historyMsgs[room.historyMsgs.length - 1]
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

    // var self=this;
    // this.$store.dispatch({type:'loadMsgs'}).then(msgs=>{
    //     self.msgs=msgs;
    //     var usersImgs=msgs.map(msg=>{
    //         debugger
    //         var userId=msg.from._Id;
    //         // console.log('user id',userId)
    //        this.$store.dispatch({type:'getUserById',userId}).then(user=>{
    //            console.log(user)
    //            this.usersImgs.push(user)
    //            })
    //     })
    // });
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
