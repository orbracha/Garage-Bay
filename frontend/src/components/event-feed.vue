<template>

    <h1>Upcoming events: {{news}}</h1>

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
    }, 3000);
  },

  destroyed() {
    clearInterval(this.feed);
  }
};
</script>

<style lang="scss" scoped>
h1{
    marging: 0 15px;
    color:rgb(245, 245, 245);
    text-align: left;
}
</style>


