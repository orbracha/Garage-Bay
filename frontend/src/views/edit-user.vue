<template>
  <div class="editContainer">
    <form @submit.prevent="saveUser" v-if="user">
        <label for="image" @click="editImage">

      <img :src="newImage?newImage:editedUser.img" alt="no image to display" >
        </label>
      <!-- <div class="file-upload-form">
        Upload an image file:
        <input type="file" @change="previewImage" accept="image/*">
      </div> -->
      <label>
        Nickname:
        <input type="text" v-model="editedUser.nickname">
      </label>
      <label>
        Password:
        <input type="password" v-model="editedUser.password">
      </label>
      
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-user",
  data() {
    return {
      editedUser: {},
      
    }
  },
  computed: {
    user() {
      if(this.$store.getters.editUser){
        var editedUser = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        )}
      else if (this.$store.getters.getLoggedUser) {
        var editedUser = JSON.parse(
          JSON.stringify(this.$store.getters.getLoggedUser)
        );
        this.editedUser = editedUser;
        return true;
      }
      return false;
    },
    newImage(){
      return this.$store.getters.getImageUrl
    }
  },
  methods:{
      editImage(){
          console.log('clicked');
          var editUser=this.editedUser
          this.$store.commit({type: 'setEditUser', editUser})
          this.$router.push(`/select-image/edit-user`);
      },
      saveUser(){
        this.editedUser.img=this.newImage;
        let user=this.editedUser
        this.$store.dispatch({type:'updateUser',user })
        .then((user)=>{
           this.$router.push(`/user/${user._id}`);
          
        })
        
      }

  },

};
</script>

<style lang="scss" scoped>
.editContainer {
  color: white;
  margin-top: 150px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    margin: 10px;
  }
}
img.preview {
  /* width: 200px; */
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>
