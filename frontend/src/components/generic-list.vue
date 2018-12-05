<template>
  <ul class="generic-list">
    <generic-preview v-for="(item,idx) in data" :item="item" :key="idx"></generic-preview>
  </ul>
</template>

<script>
import genericPreview from "./generic-preview.vue";
export default {
  props: {
    data: Array
  },
  components: {
    genericPreview
  }
};
</script>

<style lang="scss" scoped>
.generic-list{
  padding: 20px;
}
</style>

