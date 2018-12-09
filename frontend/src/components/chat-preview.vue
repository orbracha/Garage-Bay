<template>
  <router-link :to="item.link">
    <li>
      <span class="available" :class="{'offline':!item.isAvailable,'inline':item.isAvailable}"></span>
      <img v-if="item.img" :src="item.img">
      <div>
        <div class="chat-head">{{item.title}}</div>
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
  padding: 6px;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
  color: rgb(53, 53, 53);
  background-color: rgba(255, 255, 255, 0); 
  background-image: linear-gradient(to right, rgb(236, 236, 236) , rgba(255, 255, 255, 0)); 
  position: relative;
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  .chat-head{
    font-weight: 700;
    color:rgb(46, 46, 46);
    font-size: 1.6rem;

  }
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h1,
  p {
    color:rgb(46, 46, 46);
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




