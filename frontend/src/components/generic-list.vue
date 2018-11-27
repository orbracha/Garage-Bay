<template>
  <ul>
    <generic-preview v-for="(item,idx) in data" :item="item" :key="idx"></generic-preview>
    {{data}}
  </ul>
</template>

<script>
import genericPreview from './generic-preview.vue'
export default {
    props:{
        data:Array
    },
components:{
    genericPreview
}
}
</script>

<style>

</style>
