<template>
  <li>
    <img src="https://api.adorable.io/avatars/285/abott@adorable.png">
    <h1 >{{item.from.nickname}}</h1>
    <p>{{item.txt}}</p>
  </li>
</template>

<style lang="scss" scoped>
  li{
    list-style-type: none;
    display: grid;
  }
</style>


<script>
export default {
props:['item']
}
</script>

