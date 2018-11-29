<template>
  <section>
    <!-- <garage-footer/> -->
    <h1>Login</h1>
    <form @submit.prevent="checkUser">
      <label>
        <span>Username:</span>
        <input autofocus type="text" v-model="user.nickname" required>
      </label>
      <label>
        <span>Password:</span>
        <input type="password" v-model="user.password" required>
      </label>
      <button>Login</button>
      <span v-if="isUnknowen">Unvalid Username/Password</span>
    </form>
  </section>
</template>

<script>
// @ is an alias to /src
// import userList from "@/components/user-list.vue";

export default {
  name: "login",
  data() {
    return {
      user: {
        nickname: null,
        password: null
      },
      isUnknowen: false
    };
  },
  methods: {
    checkUser() {
      var user = JSON.parse(JSON.stringify(this.user));
      this.$store
        .dispatch({ type: "checkUser", user })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.isUnknowen = true;
          setTimeout(() => (this.isUnknowen = false), 2000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background: url("");
}
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
