<template>
  <div id="app">
    <footer id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link>| -->
      <!-- <router-link to="/chat">Chat</router-link>| -->
      <!-- <router-link to="/forparams">for params</router-link> -->
    </footer>
    
    <router-view/>
    
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
