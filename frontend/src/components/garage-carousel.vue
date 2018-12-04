<template>
  <carousel
    class="carousel"
    :perPage="1"
  
    :mouse-drag="true"
    :navigationEnabled="true"
    :paginationEnabled="false"
    :loop="true"
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

<style lang="scss" scoped>
.carousel {
  margin-top: 90px;

}
@media(min-width:950px){
    carousel{
        margin-left: 210px;
    }
}


</style>
 

