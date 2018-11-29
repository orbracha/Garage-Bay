<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/item/edit">Edit</router-link>|
      <router-link to="/search">search</router-link>|
      <!-- <router-link to="/chat">Chat</router-link>| -->
      <!-- <router-link to="/forparams">for params</router-link> -->
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100vh;

  text-align: center;
  color: #2c3e50;
  margin: 0;
}
#nav {
  padding: 30px;
  padding-top:80px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
