<template>
  <section>
    <ul class="home-list">
      <item-preview v-for="item in items" :item="item" :key="item._id"/>
    </ul>
  </section>
</template>

<script>
import itemPreview from "@/components/item-preview.vue";
import itemService from "@/services/item-service.js";
export default {
  props: {
    items: Array
  },

  components: {
    itemPreview,
    itemService
  }
};
</script>

<style lang="scss" scoped>
</style>

