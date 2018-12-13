<template>
  <li class="dibs-li">
    <template v-if="!isAnsList">
      <div class="dib-container">
        <sui-card v-if="fromUser">
          <sui-card-content>
            <router-link :to="'/user/'+fromUser._id">
              <sui-image :src="fromUser.img" class="right floated"/>
              <sui-card-header>{{fromUser.nickname}}</sui-card-header>
            </router-link>
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
                <sui-button basic negative @click="$emit('sendAns',{dib,idx,type:false})">
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
            <router-link :to="'/item/details/'+dib.item._id">
              <sui-image :src="dib.item.img" class="right floated"/>
            </router-link>
            <sui-card-header>
              <template v-if="!dib.isAns">Pending
                <div class="call-seller">
                  <router-link :to="'/chat/user/'+ dib.item.sellerId">
                    <i class="far fa-comment-alt"></i>
                  </router-link>
                </div>
              </template>
              <template v-else>
                <template v-if="dib.type">Accepted!
                  <div class="call-seller">
                    <router-link :to="'/chat/user/'+ dib.item.sellerId">
                      <i class="far fa-comment-alt"></i>
                    </router-link>
                  </div>
                </template>
                <template v-else>Declined
                  <br>

                  <!-- <router-link :to="'/chat/user/'+ dib.item.sellerId">&#128172;</router-link> -->
                </template>
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
  .call-seller{
    padding-top: 20px
  }
}
</style>

