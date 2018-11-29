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
li {
  display: flex;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
</style>


<script>
export default {
  props: ["item"]
};
</script>

