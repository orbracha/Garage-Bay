<template>
  <section>
    <i @click="$router.go(-1)" class="fas fa-arrow-left"></i>
    <!-- <button @click="$router.go(-1)">←</button> -->
    <slot name="headline"></slot>
    <slot name="optional-box"></slot>
    <slot name="optionalIcon"></slot>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// section {
//   padding: 0 25px;
//   // background-image: url("../assets/img/homeHeader.jpg");
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-color: gray;
//   height: 70px;
//   display: flex;
//   color: #e8e8e8;
//   align-items: center;
//   justify-content: space-between;
//   i {
//     font-size: 1.3rem;
//     &:hover {
//       cursor: pointer;
//     }
//   }
// }
</style>
