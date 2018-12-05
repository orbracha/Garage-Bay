<template>
  <ul>
    <h1 v-if="!dibs.length">No dibs</h1>
    <dibs-preview
      v-else
      v-for="(dib,idx) in dibs"
      :key="idx"
      :dib="dib"
      :idx="idx"
      :isAnsList="isDibs"
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
    dibs: Array,
    isDibs: Boolean
  },
  components: {
    dibsPreview
  }
};
</script>

<style>
</style>
