<template>
  <div class="screen" :class="{ open: isMenu }" @click="toggleMenu"></div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      this.$store.commit({ type: "toggleMenu" });
    }
  },
  computed: {
    isMenu() {
      return this.$store.state.isMenu;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

