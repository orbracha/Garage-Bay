<template>
    <section>
       <button @click="$router.go(-1)">←</button>
        <slot name="headline"></slot>
       <slot name="optionalIcon"></slot>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
section {
  height: 10%;
  display: flex;
  background-color: #666666;
  color: #e8e8e8;
  align-items: center;
  
  display: flex;
  justify-content: space-around;
}
</style>
