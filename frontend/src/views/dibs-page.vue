<template>
  <section v-if="loggedUser" class="dibs-container">
    <dibs-list
      @sendAns="sendAns"
      @removeDib="removeDib"
      @cancelDibReq="cancelDibReq"
      @doneBuy="doneBuy"
      :dibs="((isDibs)? dibsAns:dibs)"
      :isDibs="isDibs"
    ></dibs-list>
  </section>
</template>

<script>
import dibsList from "@/components/dibs-list.vue";
export default {
  props: ["isDibs"],
  computed: {
    dibs() {
      return this.$store.getters.getLoggedUser.dibs;
    },
    dibsAns() {
      return this.$store.getters.getLoggedUser.dibsAns;
    },
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    }
  },
  methods: {
    removeDib(idx) {
      var user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
      user.dibs.splice(idx, 1);
      return this.$store.dispatch({ type: "updateUser", user });
    },
    sendAns({ dib, idx, type }) {
      var ans = {
        dib,
        idx,
        type
      };
      if (type) {
        this.$store
          .dispatch({ type: "removeItem", item: dib.item })
          .then(() => {
            this.$emit("removeItem");
          });
        this.removeDib(idx).then(() => {
          this.$store.dispatch({ type: "sendAns", ans });
        });
      } else {
        let item = JSON.parse(JSON.stringify(dib.item));
        let userIdx = item.callDibs.indexOf(dib.from);
        item.callDibs.splice(userIdx, 1);
        this.$store.dispatch({ type: "editItem", item });
        this.removeDib(idx).then(() => {
          this.$store.dispatch({ type: "sendAns", ans });
        });
      }
    },
    cancelDibReq({ dib, idx }) {
      let item = JSON.parse(JSON.stringify(dib.item));
      let userIdx = item.callDibs.indexOf(this.loggedUser._id);
      item.callDibs.splice(userIdx, 1);
      this.$store.dispatch({ type: "editItem", item });
      dib.from = this.$store.getters.getLoggedUser._id;
      var user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
      user.dibsAns.splice(idx, 1);
      this.$store.dispatch({ type: "updateUser", user });
      this.$store.dispatch({ type: "cancelDibReq", dib });
    },
    doneBuy(idx) {
      // alert("Review!");
      var user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
      console.log(user);
      user.dibsAns.splice(idx, 1);
      console.log(user);
      this.$store.dispatch({ type: "updateUser", user });
    }
  },

  components: {
    dibsList
  }
};
</script>

<style lang="scss" scoped>
</style>
