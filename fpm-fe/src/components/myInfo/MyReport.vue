<template>
  <div>
    <h2>금융 분석 리포트</h2>
    <!--<img :src="`${ getMyReport }`" alt="myReport"/>-->
    <img :src="require(`@/assets/images/dummy.jpg`)" style="width:100vw"/>
  </div>
</template>

<script>
export default {
    computed: {
        // 여기서 미리 이미지 불러와야할듯
        /*
        getMyReport(){
            return ;
        }
        */
    }
}
</script>

<style>

</style>