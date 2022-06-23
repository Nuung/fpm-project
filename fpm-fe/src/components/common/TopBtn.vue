<template>
  <div class="topBtnWrapper">
    <div class="name"><b>FPM</b></div>
    <div class="logo"><font-awesome-icon icon="bell" /></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .topBtnWrapper{
    background-color: rgba(255, 255, 255);
    width: 100vw;
    height: 9vh;
    line-height: 9vh;
  }
  .name{
    margin-left: 3vw;
    font-size: 4vh;
    width: 47vw;
    float: left;
    text-align: left;
  }
  .logo{
    color: rgb(124, 124, 124);
    margin-right: 7vw;
    font-size: 4vh;
    width: 43vw;
    float: left;
    text-align: right;
  }
</style>