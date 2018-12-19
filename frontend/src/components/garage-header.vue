<template>
  <header class="home-header flex row between center">
    <div class="logo-container flex row center">
      <div class="burger">
        <i class="fas fa-times" v-if="isMenu" @click="toggleMenu"></i>
        <i class="fas fa-bars" v-else @click="toggleMenu"></i>
      </div>
      <router-link to="/">
        <div class="logo-text">dibs</div>
      </router-link>
    </div>
    <div class="header-icons-container flex row">
      <div class="search-container">
        <router-link to="/search">
          <input placeholder="Search items" @input="search" v-model="filterTxt" type="text">
        </router-link>
        <i class="fas fa-search"></i>
      </div>
      <div v-if="user" class=" header-icons flex row center">
        <section class="user-icon-text">
          <div>Hello {{user.nickname}}</div>
          <a @click="logoutUser" class="logoutBtn">Logout</a>
        </section>
        <router-link class="header-profile-icon" :to="'/user/'+user._id">
          <i class="fas fa-user"></i>
          <span
            v-if="user.dibsAns.filter(ans=>ans.isAns).length || user.dibs.length "
            class="notification"
          >{{user.dibsAns.filter(ans=>ans.isAns).length + user.dibs.length}}</span>
        </router-link>
      </div>
      <div v-else>
        <router-link class="header-profile-icon" to="/login">Login</router-link>&ensp;|
        <router-link class="header-profile-icon" to="/signup">Signup</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      filterTxt: ""
    };
  },
  methods: {
    toggleMenu() {
      this.$store.commit({ type: "toggleMenu" });
    },
    logoutUser() {
      this.$store.dispatch({ type: "disconnentChat", user: this.user });
      this.$store.dispatch({ type: "logout" }).then(() => {
        this.$router.push("/");
      });
    },
    search() {
      this.$store.commit({ type: "setFilterTxt", txt: this.filterTxt });
    }
  },
  computed: {
    isMenu() {
      return this.$store.state.isMenu;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.logoutBtn {
  cursor: pointer;
}
.logo-text {
  margin-right: 10px;
}
.search-container {
  margin-right: 15px;
  height: 30px;
  position: relative;
  margin-top: 4px;
  input {
    height: 100%;
    // font-size: 15px;
    padding: 8px 7px 7px 28px;
    border: none;
    // border-radius: 3px;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .fa-search {
    position: absolute;
    font-size: 16px;
    top: 6px;
    left: 14px;
    color: rgb(189, 189, 189);
  }
}
</style>
