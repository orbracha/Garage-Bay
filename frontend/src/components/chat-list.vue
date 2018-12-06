<template>
  <ul>
    <chat-preview v-for="(item,idx) in data" :item="item" :key="idx"></chat-preview>
  </ul>
</template>

<script>
import chatPreview from "./chat-preview.vue";
export default {
  props: {
    data: Array
  },
  components: {
    chatPreview
  }
};
</script>

<style>
</style>
