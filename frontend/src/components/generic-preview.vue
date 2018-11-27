<template>
  <li>
    <div id="img-container" :style="{background:'black'}"></div>
    <!-- <img src="https://api.adorable.io/avatars/285/abott@adorable.png"> -->
    <div>
      <h1>avi</h1>
      <p>{{item.txt}}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
  li{
    list-style-type: none;
    display: flex;
    margin-bottom: 5px;
    // img {
    //   height: 50px;
    //   width: 50px;
    //   grid-column: 1/2;
    //   grid-row: 1/3;
    // }
    #img-container{
      height: 50px;
      width: 50px;
      border-radius: 50%;
      // background: url('https://api.adorable.io/avatars/285/abott@adorable.png') no-repeat;
      background-size: center;
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

