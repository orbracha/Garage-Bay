<template>
  <div class="item-container">
    {{currItem}}
    <header>
      <span slot="leftArrow">
        <b>←</b>
      </span>
      <div class="content" slot="headline">
        <h3>{{currItem.title}}</h3>
        <span>Created at: {{currItem.createAt}}</span>
      </div>
      <span slot="optionalIcon">❤</span>
    </header>

    <!-- {{currItem.img}} -->
    <img src="http://dummyimage.com/1200x800.png" alt="placeholder image">
    <div class="chatLink-container">
      <span @click="chatClicked">&#9993;</span>
      <p>Like it? Start chat</p>
    </div>
    <div class="details-container">
      <p>Description: {{currItem.desc}}</p>
      <p>Location: need to add with geo location</p>
      <p>Condition: {{currItem.condition}}</p>
      <div class="seller-details">
        <img class="seller-img" src="http://dummyimage.com/50x50.png" alt="placeholder image">
        <p>Seller Name</p>
        <p>Seller rate</p>
        <p>How many current items</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'item-details',
    data(){
        return{
            currItem:{}
        }
    },
    created(){
        var itemId=this.$route.params.id
        this.$store.dispatch({type: 'getItemById',itemId})
            .then(item=>this.currItem=item)
            //TODO WITH REAL DATA: 
            //after getting the item - get seller id=> set seller name, image, rate, how many current items
    },
    methods:{
        chatClicked(){
            console.log('chat link clicked');
            
        }
    }
}
</script>

<style>
*{
    box-sizing: border-box;
}
.details-container{
    margin: 10px 0;
    text-align: left;
}
.seller-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;

    object-fit: cover;
    object-position: center right;
}
.chatLink-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.chatLink-container span{
    margin-right: 5px;
}
.item-container{
    width: 90%;
    margin: 0 auto;
}
header{
    display: flex;
    background-color: #666666;
    color:#e8e8e8;
    align-items: center;
    justify-content: center;
}
img{
    width: 100%;
    height: auto;
}
</style>
