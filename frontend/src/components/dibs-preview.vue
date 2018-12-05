<template>
  <li class="dibs-li">
    <template v-if="!isAnsList">
      <div v-if="fromUser">
        <h1>{{fromUser.nickname}}</h1>
        <img :src="fromUser.img" alt>
      </div>
      <p>Want:</p>
      <img :src="dib.item.img">
      <h1>{{dib.item.title}}</h1>
      <div>
        <button @click="$emit('sendAns',{dib,idx,type:true})">Agree</button>
        <button @click="$emit('sendAns',{dib,idx,type:false})">Deny</button>
      </div>
    </template>
    <template v-else>
      <div class="dibsAns-container">
        <img :src="dib.item.img">
        <h1>{{dib.item.title}}</h1>
        <span v-if="!dib.isAns">
          <i class="far fa-clock"/>
          <i class="fas fa-minus-circle" @click="$emit('cancelDibReq',{dib,idx})"/>
        </span>
        <span v-else>
          <span>The seller is {{(dib.type)? 'Agree':'Deny'}}</span>
          <router-link :to="'/chat/user/'+ dib.item.sellerId">&#128172;</router-link>
          <i @click="$emit('doneBuy',idx)" class="far fa-check-circle"/>
        </span>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: ["dib", "idx"],
  data() {
    return {
      fromUser: null,
      isAnsList: true
    };
  },
  methods: {
    getFromUser() {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: this.dib.from
        })
        .then(user => (this.fromUser = user));
    }
  },
  created() {
    if (!this.$route.params.dibRoute) {
      this.isAnsList = false;
      this.getFromUser();
    }
  }
};
</script>


<style lang="scss" scoped>
// li {
//   display: flex;
//   text-align: left;
//   align-items: center;
//   img {
//     height: 60px;
//     width: 60px;
//   }
//   button {
//     height: 25px;
//   }
//   .fa-minus-circle {
//     color: red;
//     cursor: pointer;
//     transition: 0.8s;
//   }
//   .fa-minus-circle:hover {
//     transform: rotate(-90deg);
//   }
//   .fa-check-circle {
//     cursor: pointer;
//     border-radius: 50%;
//     font-size: 30px;
//   }
//   .fa-check-circle:hover {
//     background: green;
//   }
// }
</style>


