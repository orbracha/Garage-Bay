<template>
  <section>
    <div class="login-page page-layout flex column">
      <!-- <img class="home-logo" src="../assets/img/logo1.svg"> -->
      <form class="flex column" @submit.prevent="checkUser">
        <label class="input-line">
          <div>Username:</div>
          <input autofocus type="text" v-model="user.nickname" required>
        </label>
        <label class="input-line">
          <div>Password:</div>
          <input type="password" v-model="user.password" required>
        </label>
        <button class="login-btn">Login</button>
        <span v-if="isUnknowen">Unvalid Username/Password</span>
      </form>
      <p>New Here?</p>
      <router-link to="/signup"> <button class="sign-btn">Sign up!</button></router-link>
      <p>or</p>
      <router-link to="/">
      <button class="sign-btn">Continue as a guest</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import garageFooter from "@/components/garage-footer.vue";

export default {
  name: "login",
  components: {
    garageFooter
  },

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
</style>
