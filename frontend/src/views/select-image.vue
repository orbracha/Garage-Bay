<template>
  <div class="add-item-container flex column">
    <div class="video-container">
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

    <div class="icon">
      <!-- <button id="snap" v-on:click="capture"> -->
        <i class="fas fa-camera" id="snap" v-on:click="capture"></i>
      <!-- </button> -->
    </div>

    <div class="file-upload-form">
      Or <br> <br>
      <input type="file" @change="previewImage" accept="image/*">
    </div>

    <canvas ref="canvas" id="canvas" width="640" height="480" v-if="showStream"></canvas>
    <div class="image-preview" v-else>
      <img class="preview" :src="imageData">
    </div>
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
      showStream: true,
      imageData: ""
    };
  },
  mounted() {
    var isUser = this.$store.getters.getLoggedUser;
    if (!isUser) this.$router.push("/login");
    else {
      this.video = this.$refs.video;
      this.stream && this.stream.stop && this.stream.stop();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.stream = stream;
          this.video.src = window.URL.createObjectURL(stream);
          this.video.play().catch(err => console.log(err));
        });
      }
    }
  },
  methods: {
    stopStream() {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.showStream = false;
    },
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(canvas.toDataURL("image/png"));
      this.stopStream();
      this.saveImage();
    },
    saveImage() {
      if (this.captures[0]) var imageToSave = this.captures[0];
      else var imageToSave = this.imageData;
      this.$store
        .dispatch({ type: "saveImage", imageToSave })
        .then(res => {
           if(this.$route.params.def === 'edit-user'){
                this.$router.push('/user/edit/userId')
          }
          else if(this.$route.params.def==='item'){
            this.$router.push(`/item/edit`)
          }
          else {
            this.$router.push("/signup");
            console.log("PARAMS", this.$route.params.def);
          }
        })
        .catch(err => {
          console.log("ERROR:", err);
        });
    },

    previewImage(event) {
      this.stopStream();
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
          this.saveImage();
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
  beforeDestroy(){
     const tracks = this.stream.getTracks();
    if(tracks)
    this.stopStream()
  }
};
</script>

<style lang="scss" scoped>

.add-item-container{
  text-align: center;
  .icon{
  margin-bottom: 20px;

  }
  i{
    padding: 8px;
    background-color:white;
    border-radius: 90px;

  }
}
img.preview {
  /* width: 200px; */
  // top:120px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
.video-container {
  width: 90%;
  margin: 0 auto;
  max-width: 400px;
  height: 400px;

input{
  text-align: center;
}
}
  #video {
    width: 100%;
  }
</style>
