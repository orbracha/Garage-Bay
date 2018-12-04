<template>
  <carousel :per-page="1" :centerMode="true" :autoplay="true" :mouse-drag="false" 
  :loop="true">
    <slide>
       <garage-card :user="user"/>
    </slide>
    <slide>
       <garage-card :user="user"/>
    </slide>
    <slide>
      <garage-card :user="user"/>
    </slide>
    <slide>
       <garage-card :user="user"/>
    </slide>
  </carousel>
</template>




<script>
import { Carousel, Slide } from "vue-carousel";
import garageCard from "@/components/garage-card.vue";

export default {
  props: ['user'],
  components: {
    Carousel,
    Slide,
    garageCard
  }
};
</script>

<style>
</style>
