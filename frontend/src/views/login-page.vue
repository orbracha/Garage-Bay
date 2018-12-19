<template>
  <section>
    <div class="login-page page-layout flex column">
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

        <el-form-item>
          <el-button type="primary" @click="checkUser">Login</el-button>
          <el-button @click="resetForm('user')">Reset</el-button>
        </el-form-item>
      </el-form>
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
export default {
  name: "login",

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
    return {
      user: {
        password: "",
        nickname: ""
      },

      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        nickname: [
          {
            required: true,
            message: "Please input a name",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "Length should be 2 to 8",
            trigger: "blur"
          }
        ]
      },
      isUnknowen: false
    };
  },
  methods: {
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
