<template>
  <!-- <carousel
    class="carousel"
    :perPage="1"
  
    :mouse-drag="true"
    :navigationEnabled="true"
    :paginationEnabled="false"
    :autoplay="true" 
    ease-in-out
  
  >-->
  <!-- <div class="carousel-wrapper"> -->
  <carousel
    class="carousel"
    :loop="true"
    :per-page="1"
    :perPageCustom="[[480, 1], [768, 2]]"
    :navigationEnabled="false"
    :mouse-drag="false"
  >
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
  <!-- </div> -->
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
// .carousel-wrapper {
//   width: 500px;
.VueCarousel-pagination {
  // transform: translate(-200px, -50px);
  position: absolute;
  left: 15px;
  bottom: 0px;
}
.VueCarousel-dot {
  padding: 6px !important;
  margin: 0;
}
.VueCarousel-pagination {
  text-align: left !important;
}
// }
</style>
 

