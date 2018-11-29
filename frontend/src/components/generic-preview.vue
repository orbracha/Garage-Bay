<template>
  <li>
    <img v-if="item.img" :src="item.img">
    <div>
      <h1>{{item.title}}</h1>
      <p>{{item.txt}}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
props:['item']
}
</script>

