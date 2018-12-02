<template>
  <div>
    <div>
      <video
        v-if="showStream"
        ref="video"
        id="video"
        width="640"
        height="480"
        autoplay
        muted="muted"
      ></video>
    </div>

    <div>
      <button id="snap" v-on:click="capture">Snap Photo</button>
    </div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
export default {
  name: "select-image",
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      stream: null,
      showStream: true
    };
  },
  mounted() {

    this.video = this.$refs.video;
    this.stream && this.stream.stop && this.stream.stop();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play().catch(err => console.log(err));
      });
    }
  },
  methods: {
   
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(canvas.toDataURL("image/png"));

      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.showStream = false;
      this.saveImage();
    },
    saveImage() {
      var imageToSave = this.captures[0];

      this.$store.dispatch({ type: "saveImage", imageToSave })
      .then(res => {
        this.$router.push('/item/edit')
      })
      .catch(err=>{
        console.log('ERROR:', err);
        
      })
    }
  },
  beforeDestroy() {
    const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop());
  }
};
</script>

<style>
</style>
