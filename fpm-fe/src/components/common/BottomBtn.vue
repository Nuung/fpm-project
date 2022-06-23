<template>
  <div class="bottom-menu">
    <div>
        <font-awesome-icon icon="house" />
    </div>
    <div>
        <font-awesome-icon icon="user-group" />
    </div>
    <div>
        <font-awesome-icon icon="fire" />
    </div>
    <div>
        <font-awesome-icon icon="square-poll-vertical" />
    </div>
    <div>
        <font-awesome-icon icon="circle-user" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .bottom-menu{
    width: 100vw;
    height: 10vh;
    line-height: 10vh;
    background-color: lightgray;
  }
  .bottom-menu > div{
    display: inline;
    height: 10vh;
    line-height: 10vh;
    margin: 5vw;
    font-size: 5vw;
  }
</style>