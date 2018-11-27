<template>
  <section>
    <section class="user-preview">
      <div id="img-container" :style="{background:'green'}"></div>
      <!-- <img src="https://api.adorable.io/avatars/285/abott@adorable.png"> -->
      <div>
        <h1>{{user.nickname}}</h1>
        <p>{{user.nickname}}</p>
      </div>
    </section>
    <ul class="items-thumbnail">
      <li v-for="item in user.itemList" :item="user.itemList" :key="item">{{item}}</li>
    </ul>
  </section>
</template>

<script>
// @ is an alias to /src
// import userList from "@/components/user-list.vue";

export default {
  name: "home",
  //   components: {
  //     userList
  //   },
  data() {
    return {
      user: {}
    };
  },
  created() {
    var userId = this.$route.params.id;
    this.$store
      .dispatch({ type: "getUserById", userId })
      .then(user => (this.user = user));
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
