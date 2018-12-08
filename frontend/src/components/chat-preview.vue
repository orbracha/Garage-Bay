<template>
  <router-link :to="item.link">
    <li>
      <span class="available" :class="{'offline':!item.isAvailable,'inline':item.isAvailable}"></span>
      <img v-if="item.img" :src="item.img">
      <div>
        <h1>{{item.title}}</h1>
        <p>{{item.txt}}</p>
      </div>
    </li>
  </router-link>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: rgb(53, 53, 53);
}
li {
  color: rgb(53, 53, 53);
  position: relative;
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h1,
  p {
    margin: 0;
  }
}
.available{
  height: 10px;
  width: 10px;
  border-radius: 50px;
  position: absolute;
  top:0;
}
.available.offline {
  background: #E38968;
}
.available.inline {
  background: #86BB71;
}
</style>




