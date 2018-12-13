<template>
  <section>
    <div class="login-page page-layout flex column">
      <!-- <img class="home-logo" src="../assets/img/logo1.svg"> -->
      <el-form
        @submit.prevent="checkUser"
        :model="user"
        status-icon
        :rules="rules2"
        ref="user"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="checkUser">Login</el-button>
          <el-button @click="resetForm('user')">Reset</el-button>
        </el-form-item>
      </el-form>

      <!-- <form class="flex column" @submit.prevent="checkUser">
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
      </form>-->
      <p>New Here?</p>
      <router-link to="/signup">
        <button class="sign-btn">Sign up!</button>
      </router-link>
      <p>or</p>
      <router-link to="/">
        <button class="sign-btn">Continue as a guest</button>
      </router-link>
    </div>
  </section>
</template>

<script>
// import garageFooter from "@/components/garage-footer.vue";

export default {
  name: "login",
  // components: {
  //   garageFooter
  // },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.user.validateField("checkPass");
        }
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Please input the password again"));
    //   } else if (value !== this.user.pass) {
    //     callback(new Error("Two inputs don't match!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      user: {
        password: "",
        // checkPass: "",
        nickname: ""
      },

      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [
          {
            required: true,
            message: "Please input a name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 8,
            message: "Length should be 3 to 8",
            trigger: "blur"
          }
        ]
      },
      // user: {
      //   nickname: null,
      //   password: null
      // },
      isUnknowen: false
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
