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

    <div class="file-upload-form">
      Upload an image file:
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
      if (this.captures[0])  var imageToSave = this.captures[0];
       else  var imageToSave = this.imageData;
      this.$store
        .dispatch({ type: "saveImage", imageToSave })
        .then(res => {
     
           if(this.$route.params.def === 'edit-user'){
                this.$router.push('/user/edit/userId')
          }
          else if(this.$route.params.def==='item'){
            console.log('res is ', res);
            
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
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
          this.saveImage();
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }

};
</script>

<style>
img.preview {
  /* width: 200px; */
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>
