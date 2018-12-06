<template>
  <section>
    <form class="form-container" @submit.prevent="saveUser">
      <img
        :src="img? img:'https://res.cloudinary.com/duxpc5ggn/image/upload/v1543435981/u1.jpg'"
        alt
        srcset
      >
      <router-link to="/select-image" class="camera-icon flex column center">
        <i class="fas fa-camera"/>
        <div>{{img? 'Edit':'Add'}} Photo</div>
      </router-link>
      <!-- <img :src="currItem.img"> -->
      <div class="text-container">
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
      </div>
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
</script>

<style lang="scss" scoped>
span {
  margin: 2px 0;
}
.form-container {
  // width: 300px;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
label {
  display: block;
  margin: 5px auto;
  span {
    display: block;
    margin: 5px auto;
  }
}
.camera-icon {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.596);
  border-radius: 99px;
  position: relative;
  top: -150px;
  color: white;
  text-decoration: none;
  i {
    color: white;
    padding: 0;
  }
}
form {
  margin-top: 80px;
  // margin: 0 auto;
  .text-container{
    transform: translateY(-100px)

  }
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

