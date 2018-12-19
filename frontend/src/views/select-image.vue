<template>
  <div class="add-item-container flex column">
    <img v-if="isLoading" class="loading" src="../assets/img/loader.gif" alt srcset>
    <label id="#bb">
      Upload a File
      <input type="file" id="File" size="60" accept="image/*" @change="onSelectedFile">
    </label>
    <div class="video-container" v-if="isPc">
      <br v-if="!showStream">
      <span v-if="!showStream">Or</span>
      <br>
      <div class="icon add-photo" v-if="!showStream" @click="startStream">
        <i class="fas fa-play-circle"></i>
        Take a photo
      </div>
      <div v-if="showStream">
        <video ref="video" id="video" width="300" height="300" autoplay muted="muted"></video>
        <div class="icon take-photo" @click="capture">
          <i class="fas fa-camera"></i>
        </div>
      </div>
      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
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
      imageData: "",
      showStream: false,
      isPc: false,
      isLoading: false
    };
  },
  mounted() {
    var isUser = this.$store.getters.getLoggedUser;
    if (
      screen.width > 500 &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    )
      this.isPc = true;
  },
  methods: {
    startStream() {
      this.showStream = true;
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.$refs.video.srcObject = stream;
      });
    },
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.$refs.video, 0, 0, 640, 480);
      this.imageData = this.canvas.toDataURL("image/png");
      this.showStream = false;
      this.stopStream();
      this.saveImage();
    },
    onSelectedFile(event) {
      var reader = new FileReader();
      reader.onload = e => {
        this.imageData = e.target.result;
        this.saveImage();
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    stopStream() {
      this.$refs.video.srcObject
        .getVideoTracks()
        .forEach(track => track.stop());
    },
    saveImage() {
      this.isLoading = true;
      var user = this.$store.getters.getLoggedUser;
      this.$store
        .dispatch({ type: "saveImage", imageToSave: this.imageData })
        .then(res => {
          if (this.$route.params.def === "edit-user" && user) {
            this.$router.push("/user/edit/userId");
          } else if (this.$route.params.def === "item" && user) {
            this.$router.push(`/item/edit`);
          } else {
            this.$router.push("/signup");
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log("ERROR:", err);
        });
    }
  },
  beforeDestroy(){
    this.stopStream()
  },
  beforeRouteUpdate() {
    var isUser = this.$store.getters.getLoggedUser;
    if (!isUser) next('/login')
  },
};
</script>

<style lang="scss" scoped>
#canvas{
  display: none;
}
.add-item-container {
  // min-height: 100vh;
  height: 450px;
  max-width: 430px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.445);
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  margin-top: 80px;
  .input {
    background: rgb(223, 223, 223);
    color: rgb(46, 46, 46);
    height: 30px;
    border: none;
    border-radius: 4px;
    text-align: center;
  }
  .icon {
    margin: 20px 0;
  }
  i {
    padding: 8px;
    background-color: white;
    border-radius: 90px;
  }
  #capture {
    cursor: pointer;
  }
}
img.preview {
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
.video-container {
  margin: 0 auto;
  max-width: 400px;
  height: 300px;


}
#video {
  width: 100%;
}

label{
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: none;
    background: #7fa00e;
    color: white;
    display: table;
    &:hover{
      cursor: pointer;
    }
     }



input[type="file"] {
    display: none;
}

</style>
