<template>
  <section>
    <ul class="listed-items-thumbnail">
      <li v-for="(item,idx) in user.wishlistItems" :key="idx" @click="itemClicked(item._id)">
        <div class="user-profile-thumbnail">
          <img class="img-thumb" :src="item.img">
        </div>
      </li>
    </ul>
    <garage-footer/>
    <garage-footer/>
  </section>
</template>

<script>
// @ is an alias to /src
import garageFooter from "@/components/garage-footer.vue";

export default {
  name: "home",
  props: ["user"],

  components: {
    garageFooter
  },
  data() {
    return {};
  },
  methods: {
    itemClicked(itemId) {
      this.$router.push(`/item/details/${itemId}`);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.user-preview {
  display: inline;
}
.items-thumbnail {
  padding: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
