<template>
  <section>
    <el-form
      @submit.prevent="saveUser"
      :model="user"
      status-icon
      :rules="rules2"
      ref="user"
      label-width="120px"
      class="demo-ruleForm form-container"
    >
      <router-link to="/select-image" class="camera-icon flex column center">
        <i class="fas fa-camera"/>
        <div>{{img? 'Edit':'Add'}} Photo</div>
      </router-link>

      <el-form-item label="Nickname" prop="nickname">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="form-btns">
        <el-button type="primary" @click="saveUser">Submit</el-button>
        <el-button @click="resetForm('user')">Reset</el-button>
      </el-form-item>
    </el-form>

    <!-- <form class="form-container" @submit.prevent="saveUser">
      <img
        :src="img? img:'https://res.cloudinary.com/duxpc5ggn/image/upload/v1543435981/u1.jpg'"
        alt
        srcset
      >
      <router-link to="/select-image" class="camera-icon flex column center">
        <i class="fas fa-camera"/>
        <div>{{img? 'Edit':'Add'}} Photo</div>
      </router-link>
      <div class="text-container">
        <label>
          <span>Nickanme:</span>
          <input type="text" @input="checkNickname" v-model="user.nickname" required>
          <span id="error-input" v-if="errorNickname.isErr">{{errorNickname.txt}}</span>
          <span id="good-input" v-else-if="user.nickname">Your nickname is good!</span>
        </label>
        <label>
          <span>Password:</span>
          <input type="password" v-model="user.password" required>
        </label>
        <label>
          <span>Repeat Password:</span>
          <input type="password" @input="checkPassword" v-model="repeatPass" required>
        </label>
        <span id="error-input" v-if="errorPass.isErr && user.password">{{errorPass.txt}}</span>
        <span id="good-input" v-else-if="repeatPass">Your Password is great!</span>
        <button :disabled="!isValid">Save</button>
      </div>
    </form>-->
  </section>
</template>

<script>
export default {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.user.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        nickname: "",
        password: "",
        checkPass: "",
        location: "",
        rate: 0,
        dibs: [],
        dibsAns: [],
        itemList: [],
        wishList: [],
        historyChat: [],
        events: [],
        img: ""
      },

      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveUser() {
      this.$store.dispatch({ type: "addUser", user: this.user }).then(() => {
        this.$router.push("/login");
      });
    },
    checkNickname() {
      this.$store
        .dispatch({
          type: "getUserByName",
          userName: this.user.nickname.trim()
        })
        .then(user => {
          if (user) this.errorNickname.isErr = true;
          else this.errorNickname.isErr = false;
        });
    }
    // checkPassword() {
    //   if (this.user.password !== this.repeatPass) this.errorPass.isErr = true;
    //   else this.errorPass.isErr = false;
    // }
  },
  computed: {
    img() {
      return this.$store.getters.getImageUrl;
    },
    isValid() {
      return (
        !(this.errorPass.isErr || this.errorNickname.isErr) &&
        (this.user.nickname !== "" && this.repeatPass !== "")
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
  margin: 0 auto;
  padding: 20px;
  max-width: 350px;
  background-color: rgba(255, 255, 255, 0.445);
  border-radius: 4px;
  align-items: center;
}
.form-btns {
  display: flex;
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
  margin: 0 auto;
  .text-container {
    transform: translateY(-100px);
  }
  img {
    width: 200px;
    margin-top: 20px;
    border-radius: 50%;
  }
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

