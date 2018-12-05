<template>
  <li class="dibs-li">
    <template v-if="!isAnsList">
      <div class="dib-container">
        <sui-card v-if="fromUser">
          <sui-card-content>
            <sui-image :src="fromUser.img" class="right floated"/>
            <sui-card-header>{{fromUser.nickname}}</sui-card-header>
            <!-- <sui-card-meta>Friends of Veronika</sui-card-meta> -->
            <sui-card-description>
              Interested about the {{dib.item.title}} that you offer:
              <img :src="dib.item.img">
            </sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <sui-container text-align="center">
              <sui-button-group>
                <sui-button basic positive @click="$emit('sendAns',{dib,idx,type:true})">
                  <i class="far fa-thumbs-up ans-icon"></i>
                </sui-button>
                <sui-button basic negative @click="$emit('sendAns',{dib,idx,type:true})">
                  <i class="far fa-thumbs-down ans-icon"></i>
                </sui-button>
              </sui-button-group>
            </sui-container>
          </sui-card-content>
        </sui-card>
      </div>
    </template>
    <template v-else>
      <div class="dibAns-container">
          <sui-card>
            <sui-card-content>
              <sui-image :src="dib.item.img" class="right floated"/>
              <sui-card-header>
                <template v-if="!dib.isAns">The seller isnt answer yet!</template>
                <template v-else>
                  The seller {{(dib.type)? 'Agree':'Deny'}} ,
                  Talk to him/her:
                  <router-link :to="'/chat/user/'+ dib.item.sellerId">&#128172;</router-link>
                </template>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content extra>
              <sui-container text-align="center">
                <sui-button-group>
                  <sui-button
                    v-if="!dib.isAns"
                    basic
                    positive
                    @click="$emit('cancelDibReq',{dib,idx})"
                  >Never mind..</sui-button>
                  <sui-button v-else basic positive @click="$emit('doneBuy',idx)">Done!</sui-button>
                </sui-button-group>
              </sui-container>
            </sui-card-content>
          </sui-card>
        </div>
    </template>
  </li>
</template>

<script>
export default {
  props: ["dib", "idx", "isAnsList"],
  data() {
    return {
      fromUser: null
      // isAnsList: true
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
    this.getFromUser();
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


