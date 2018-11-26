<template>
  <li>
    <img src="https://api.adorable.io/avatars/285/abott@adorable.png">
    <h1>{{item.from.nickname}}</h1>
    <p>{{item.txt}}</p>
  </li>
</template>

<style lang="scss" scoped>
  li{
    list-style-type: none;
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 50px;
    img {
      height: 50px;
      width: 50px;
      grid-column: 1/2;
      grid-row: 1/3;
    }
    h1{
      grid-column-start: 2;
      text-align: left;
      margin: 0;
    }
    p{
      grid-column-start: 2;
      grid-row-start: 2;
      text-align: left;
      margin: 0;
    }
  }
</style>


<script>
export default {
props:['item']
}
</script>

