<template>
  <div class="add-item-container flex column">
    <img v-if="isLoading" src="../assets/img/loader.gif" alt srcset>
    <div class="file-upload-form">
      <input type="file" accept="image/*" @change="onSelectedFile">
    </div>
    <div class="video-container" v-if="isPc">
      <br>Or
      <br>
      <div class="icon" @click="startStream">
        <i class="fas fa-play-circle"></i>
        Take a photo
      </div>
      <div v-if="showStream">
        <video ref="video" id="video" width="300" height="300" autoplay muted="muted"></video>
        <div class="icon" @click="capture">
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
      isLoading:false
    };
  },
  mounted() {
    var isUser = this.$store.getters.getLoggedUser
    if (!isUser) this.$router.push("/login")

    if (
      screen.width > 500 &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    )
      this.isPc = true
  },
  methods: {
    startStream() {
      this.showStream = true
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.$refs.video.srcObject = stream
      });
    },
    capture() {
      this.canvas = this.$refs.canvas
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.$refs.video, 0, 0, 640, 480)
      this.imageData = this.canvas.toDataURL("image/png")
      this.showStream = false
      this.stopStream()
      this.saveImage()
    },
    onSelectedFile(event) {
      var reader = new FileReader()
      reader.onload = e => {
        this.imageData = e.target.result
        this.saveImage()
      };
      reader.readAsDataURL(event.target.files[0])
    },
    stopStream() {
      this.$refs.video.srcObject
        .getVideoTracks()
        .forEach(track => track.stop())
    },
    saveImage() {
      this.isLoading=true
      var user = this.$store.getters.getLoggedUser
      this.$store
        .dispatch({ type: "saveImage", imageToSave: this.imageData })
        .then(res => {
          if (this.$route.params.def === "edit-user" && user) {
            this.$router.push("/user/edit/userId")
          } else if (this.$route.params.def === "item" && user) {
            this.$router.push(`/item/edit`)
          } else {
            this.$router.push("/signup")
          }
          this.isLoading=false;
        })
        .catch(err => {
          console.log("ERROR:", err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-item-container {
  min-height: 100vh;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.445);
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  margin-top: 70px;
  #canvas {
    display: none;
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
  // background-color: aqua;

  input {
    text-align: center;
  }
}
#video {
  width: 100%;
}
</style>
