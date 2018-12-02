<template>
  <transition name="fade">
    <h1>{{news}}</h1>
  </transition>
</template>

<script>
export default {
  props: ["events"],
  data() {
    return {
      feed: null,
      news: null
    };
  },
  created() {
    var i = 0;
    this.feed = setInterval(() => {
      console.log(this.events);

      this.news = this.events[i];
      i++;
      if (i >= this.events.length) i = 0;
    }, 2000);
  },

  destroyed() {
    clearInterval(this.feed);
  }
};
</script>

<style>
</style>
