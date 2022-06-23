<template>
  <div>
    <h2>나의 소비패턴</h2>
    <img :src="require(`@/assets/images/dummy.jpg`)" style="width:100vw"/>
    <!--<span v-for="pattern in `${ getMyPattern }`" :key="pattern">{{ pattern }}</span>-->
  </div>
</template>

<script>
export default {
    computed: {
      /*
        getMyPattern(){
            // 내 패턴 가져옴
            return ;
        }*/
    }
}
</script>

<style>

</style>