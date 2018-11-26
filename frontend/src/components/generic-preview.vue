<template>
  <li>
    <img src="item.from._id"/>
    <h1>{{item.from.nickname}}</h1>
    <p>{{item.txt}}</p>
  </li>
</template>

<script>
export default {
props:['item']
}
</script>

<style lang="scss" scoped>
    
</style>
