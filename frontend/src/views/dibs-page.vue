<template>
  <section>
    <garage-header>
      <div slot="headline">
        <h3>Dibs</h3>
      </div>
      <span slot="optionalIcon">
        <i class="fas fa-shopping-bag"/>
      </span>
    </garage-header>
    <dibs-list
      @sendAns="sendAns"
      @removeDib="removeDib"
      @cancelDibReq="cancelDibReq"
      @doneBuy="doneBuy"
      :dibs="(($route.params.dibRoute)? dibsAns:dibs)"
    ></dibs-list>
    <garage-footer/>
  </section>
</template>

<script>
import garageHeader from "../components/garage-header.vue";
import garageFooter from "@/components/garage-footer.vue";
import dibsList from "@/components/dibs-list.vue";
export default {
  computed: {
    dibs() {
      return this.$store.getters.getLoggedUser.dibs;
    },
    dibsAns() {
      return this.$store.getters.getLoggedUser.dibsAns;
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
      console.log("seller answer about his dibs", ans);
      this.removeDib(idx).then(() => {
        this.$store.dispatch({ type: "sendAns", ans });
      });
    },
    cancelDibReq({ dib, idx }) {
      if (confirm("Are you sure?")) {
        dib.from = this.$store.getters.getLoggedUser._id;
        this.$store.dispatch({ type: "cancelDibReq", dib });
        var user = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        user.dibsAns.splice(idx, 1);
        this.$store.dispatch({ type: "updateUser", user });
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
