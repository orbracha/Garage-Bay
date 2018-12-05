<template>
  <section v-if="loggedUser" class="dibs-container">
    <!-- <garage-header>
      <div slot="headline">
        <h3>Dibs</h3>
      </div>
      <span slot="optionalIcon">
        <i class="fas fa-shopping-bag"/>
      </span>
    </garage-header>-->
    <dibs-list
      @sendAns="sendAns"
      @removeDib="removeDib"
      @cancelDibReq="cancelDibReq"
      @doneBuy="doneBuy"
      :dibs="((isDibs)? dibsAns:dibs)"
      :isDibs="isDibs"
    ></dibs-list>
    <garage-footer/>
  </section>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
import garageFooter from "@/components/garage-footer.vue";
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
      console.log("after remove from dibs", user);
      return this.$store.dispatch({ type: "updateUser", user });
    },
    sendAns({ dib, idx, type }) {
      var ans = {
        dib,
        idx,
        type
      };
      this.removeDib(idx).then(() => {
        this.$store.dispatch({ type: "sendAns", ans });
      });
    },
    cancelDibReq({ dib, idx }) {
      if (confirm("Are you sure?")) {
        dib.from = this.$store.getters.getLoggedUser._id;
        var user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        user.dibsAns.splice(idx, 1);
        this.$store.dispatch({ type: "updateUser", user });
        this.$store.dispatch({ type: "cancelDibReq", dib });
      }
    },
    doneBuy(idx) {
      alert("Review!");
      var user = JSON.parse(JSON.stringify(this.$store.getters.getLoggedUser));
      console.log(user);
      user.dibsAns.splice(idx, 1);
      console.log(user);
      this.$store.dispatch({ type: "updateUser", user });
    }
  },

  components: {
    garageHeader,
    garageFooter,
    dibsList
  }
};
</script>

<style lang="scss" scoped>
</style>
