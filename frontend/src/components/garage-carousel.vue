<template>
  <carousel
    class="carousel"
    :loop="true"
    :per-page="1"
    :navigationEnabled="false"
    :mouse-drag="false"
  >
    <slide v-for="user in bestSellers" :key="user._id">
      <garage-card :user="user"/>
    </slide>
  </carousel>
</template>




<script>
import { Carousel, Slide } from "vue-carousel";
import garageCard from "@/components/garage-card.vue";

export default {
  props: ["bestSellers"],
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
  color: white;
  margin: 0;
}
.VueCarousel-pagination {
  text-align: left !important;
}

.VueCarousel-slide {
  position: relative;
  // background: #42b983;
  min-height: 100px;
}
</style>
 

