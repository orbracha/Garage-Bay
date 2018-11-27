<template>
  <li>
    <img :src="'img/'+ item.img">
    <div>
      <h1>{{item.name}}</h1>
      <p>{{item.txt}}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
  li{
    list-style-type: none;
    display: flex;
    margin-bottom: 5px;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    h1{
      text-align: left;
      margin: 0;
    }
    p{
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

