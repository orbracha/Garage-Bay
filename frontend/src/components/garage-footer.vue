<template>
  <div class="footer">
    <router-link to="/"><i class="fas fa-home"></i></router-link>
    <router-link to="/chat"><i class="far fa-comment-alt"></i></router-link>
    <router-link to="/"><i class="fas fa-plus"></i></router-link>
    <router-link to="/"><i class="far fa-heart"></i>
    </router-link><router-link to="/"><i class="fas fa-user"></i></router-link>
  </div>
</template>

<script>
export default {
  name: "garage-footer"
};
</script>

<style lang="scss" scoped>
.footer {
    i{
        font-size: 1.3rem;
    }
    a {
      // font-size: 3rem;
      color: #666666;
      text-decoration: none; /* no underline */
      transition: 0.3s;
      &:hover{
          cursor: pointer;
          transform: scale(1.2)
      }
    }
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
  display: flex;
  background-color: #e4e4e4;
  color: #353535;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
//   .far{

//       }
  .fa-plus{
      padding: 8px;
      padding-bottom: 15px;
      font-size: 2.2rem;
      background-color: #e4e4e4;
      text-align: center;
      border-radius: 50px;

  }
}
</style>
