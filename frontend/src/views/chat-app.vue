<template>
  <section>
    <!-- <garage-header> -->
    <h1>Chat Page &#128172;</h1>
    <generic-list :data="messages"></generic-list>
    <!-- <img src=" " alt=""> -->
    <!-- </garage-header> -->
  </section>
</template>

<script>
import msgService from '../../services/msg-service.js'
// import garageHeader from '../components/garage-header.vue'
import genericList from '../components/generic-list.vue'
export default {
    computed:{
        messages(){
            return msgService.msgs;
        }
    },
    components:{
        // garageHeader,
        genericList
    }
}
</script>

<style>

</style>
