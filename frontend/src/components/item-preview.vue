<template>
<section>
        <li class="main-list-item">
           <div class="main-list-header"> {{item.name}}</div>
           <div lass="main-list-img"></div>
            <!-- <img class="main-list-img" :src="item.img"> -->
            <div class="main-item-details">
                <div>{{item.desc}}</div>
                <div>{{item.price}}</div>
                <div>{{item.desc}}</div>
            </div>
    
        </li>
    </section>
</template>

<script>
export default {
      props: {
        item: Object
    },

}
</script>

<style lang="scss" scoped>
li{
    display: flex;
    flex-direction: column;
}

.main-list-img{
    background-color: greenyellow;
    height: 300px;
    width: 100%;
    // object-fit: cover;
    // transition: 0.3s;
}
</style>

