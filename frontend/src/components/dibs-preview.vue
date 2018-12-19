<template>
  <li class="dibs-li">
    <template v-if="!isAnsList">
      <div class="dib-container">
        <sui-card v-if="fromUser">
          <sui-card-content>
            <router-link :to="'/user/'+fromUser._id" class="flex row">
              <sui-image :src="fromUser.img" class="right floated"/>
              <sui-card-header>{{fromUser.nickname}}</sui-card-header>
        
            </router-link>
            <sui-card-description>
              Interested in: {{dib.item.title}}
              <img class="img-item-dibs" :src="dib.item.img">
            </sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <sui-container text-align="center">
              <sui-button-group>
                <sui-button basic positive @click="$emit('sendAns',{dib,idx,type:true})">
                  <i class="fas fa-check"></i>
                </sui-button>
                <sui-button basic negative @click="$emit('sendAns',{dib,idx,type:false})">
                  <i class="fas fa-times"></i>
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
            <sui-card-header>
              <section class="flex row between">
                <template v-if="!dib.isAns">Pending</template>
                <template v-else>
                  <template v-if="dib.type">Accepted!</template>
                  <template v-else>Declined</template>
                </template>
                <router-link :to="'/item/details/'+dib.item._id">
                  <sui-image :src="dib.item.img"/>
                </router-link>
              </section>
              <router-link :to="'/chat/user/'+ dib.item.sellerId" class="call-seller">
                <i class="far fa-comment-alt"></i>
                <span>&ensp;</span>
                Call Seller
              </router-link>
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
    if (!this.isAnsList) {
      this.getFromUser();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  color: rgb(46, 46, 46);
  height: 165px;
  .call-seller {
    padding: 0;
    color: rgb(46, 46, 46);
  }
}
i {
  color: rgb(46, 46, 46);
  padding: 0;
  // padding-top: 6px;
}
</style>

