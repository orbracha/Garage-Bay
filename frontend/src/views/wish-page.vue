<template>
  <section>
    <ul class="items-thumbnail">
      <li v-for="item in user.wishList" :item="user.wishList" :key="item">{{item}}</li>
    </ul>
    <garage-footer/>
  </section>
</template>

<script>
// @ is an alias to /src
import garageFooter from "@/components/garage-footer.vue";

export default {
  
  name: "home",
    components: {
    garageFooter
  },
  data() {
    return {
      user: {
        _id: "5bfd709dbaca8c22a4bb1b71",
        nickname: "yarden hachla",
        password: 4343.0,
        itemList: [],
        wishList: [],
        historyChat: [],
        img: "https://i.stack.imgur.com/l60Hf.png"
      }
    };
  },
  computed: {
    // loggedUser() {
    //   return this.$store.getters.getLoggedUser;
    // },
  },
  created() {
    // var userId = this.$route.params.id;
    // this.$store
    //   .dispatch({ type: "getUserById", userId })
    //   .then(user => (this.user = user));
    //TODO WITH REAL DATA:
    //after getting the user - get items ids=> set sellers items
  }
  //   computed: {
  //     users() {
  //       console.log(this.$store.getters.usersToDisplay);
  //       return this.$store.getters.usersToDisplay;
  //     }
  //   }
};
</script>

<style lang="scss" scoped>
.user-preview {
  display: inline;
}
.items-thumbnail {
  padding: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
