<template>
  <!-- <carousel
    class="carousel"
    :perPage="1"
  
    :mouse-drag="true"
    :navigationEnabled="true"
    :paginationEnabled="false"
    :loop="true"
  > -->
   <carousel class="carousel" :autoplay="true"  :per-page="1" :mouse-drag="false">
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
    <slide>
      <garage-card :user="user"/>
    </slide>
  </carousel>
</template>




<script>
import { Carousel, Slide } from "vue-carousel";
import garageCard from "@/components/garage-card.vue";

export default {
  props: ["user"],
  components: {
    Carousel,
    Slide,
    garageCard
  }
};
</script>

<style lang="scss">
.carousel {
  // margin-top: 90px;
  .VueCarousel-pagination{
        transform: translate(-50px, -50px);
  }
}

</style>
 

