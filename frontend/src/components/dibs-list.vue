<template>
  <ul>
    <dibs-preview
      v-for="(dib,idx) in dibs"
      :key="idx"
      :dib="dib"
      :idx="idx"
      @removeDib="$emit('removeDib',$event)"
      @sendAns="$emit('sendAns',$event)"
      @cancelDibReq="$emit('cancelDibReq',$event)"
      @doneBuy="$emit('doneBuy',$event)"
    ></dibs-preview>
  </ul>
</template>

<script>
import dibsPreview from "./dibs-preview.vue";
export default {
  props: {
    dibs: Array
  },
  components: {
    dibsPreview
  }
};
</script>

<style>
</style>
