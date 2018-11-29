<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>Chat Page</h3>
      </div>
      <span slot="optionalIcon">&#128172;</span>
    </garage-header>
    <generic-list :data="msgTodisplay"></generic-list>
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
      usersImgs: []
    };
  },
  computed: {
    msgTodisplay() {
      return this.msgs.map((msg, idx) => {
        return {
          title: msg.from.nickname,
          txt: msg.txt,
          img: "img/user.jpg"
        };
      });
    },
    msgs() {
      return this.$store.getters.getMsgs;
    }
  },
  methods: {
    getUserMsgs() {
      this.msgs.map(msg => {
        var userId = msg.from._id;
        this.$store.dispatch({ type: "getUserById", userId }).then(user => {
          this.usersImgs.push(user);
        });
      });
    }
  },
  created() {
    this.$store.dispatch({ type: "loadMsgs" }).then(() => this.getUserMsgs());

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
