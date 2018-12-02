<template>
  <section>
    <header class="home-header">
      <img
        class="home-logo"
        src="https://res.cloudinary.com/duxpc5ggn/image/upload/v1543466484/logo1.png"
        alt
      >
      <h1>Sign-up</h1>
    </header>
    <form class="form-container" @submit.prevent="saveUser">
      <router-link to="/select-image">
        <span>{{img? 'Replace':'Add'}} Picture</span>
        <i class="fas fa-camera"/>
      </router-link>
      <img
        :src="img? img:'https://res.cloudinary.com/duxpc5ggn/image/upload/v1543435981/u1.jpg'"
        alt
        srcset
      >
      <!-- <img :src="currItem.img"> -->
      <label>
        <span>Nickanme:</span>
        <input type="text" @input="checkNickname" v-model="newUser.nickname" required>
        <span id="error-input" v-if="errorNickname.isErr">{{errorNickname.txt}}</span>
        <span id="good-input" v-else-if="newUser.nickname">Your nickname is good!</span>
      </label>
      <label>
        <span>Password:</span>
        <input type="password" v-model="newUser.password" required>
      </label>
      <label>
        <span>Repeat Password:</span>
        <input type="password" @input="checkPassword" v-model="repeatPass" required>
      </label>
      <span id="error-input" v-if="errorPass.isErr && newUser.password">{{errorPass.txt}}</span>
      <span id="good-input" v-else-if="repeatPass">Your Password is great!</span>
      <button :disabled="!isValid">Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        nickname: "",
        password: "",
        location: "",
        rate: 1,
        dibs: [],
        dibsAns: [],
        itemList: [],
        wishList: [],
        historyChat: [],
        events: [],
        img: ""
      },
      repeatPass: "",
      errorNickname: {
        isErr: false,
        txt: "Your nickname is used"
      },
      errorPass: {
        isErr: false,
        txt: "There problem with your password"
      }
    };
  },
  methods: {
    saveUser() {
      this.$store.dispatch({ type: "addUser", user: this.newUser }).then(() => {
        this.$router.push("/login");
      });
    },
    checkNickname() {
      this.$store
        .dispatch({
          type: "getUserByName",
          userName: this.newUser.nickname.trim()
        })
        .then(user => {
          if (user) this.errorNickname.isErr = true;
          else this.errorNickname.isErr = false;
        });
    },
    checkPassword() {
      if (this.newUser.password !== this.repeatPass)
        this.errorPass.isErr = true;
      else this.errorPass.isErr = false;
    }
  },
  computed: {
    img() {
      return this.$store.getters.getImageUrl;
    },
    isValid() {
      return (
        !(this.errorPass.isErr || this.errorNickname.isErr) &&
        (this.newUser.nickname !== "" && this.repeatPass !== "")
      );
    }
  },
  created() {},
  components: {}
};
</script>s

<style lang="scss" scoped>
label {
  display: block;
  margin: 5px auto;
  span {
    display: block;
    margin: 5px auto;
  }
}
form {
  margin-top: 80px;
  img {
    width: 200px;
    margin-top: 20px;
    border-radius: 50%;
  }
}
button {
  display: block;
  margin: 5px auto;
}
#error-input {
  color: red;
}
#good-input {
  color: green;
}
.fa-camera {
  font-size: 40px;
  display: block;
  margin: 4px auto;
}
</style>

