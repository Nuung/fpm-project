<template>
  <div>
    <my-assets></my-assets>
    <my-report></my-report>
    <my-pattern></my-pattern>
  </div>
</template>

<script>
import MyReport from './myInfo/MyReport.vue'
import MyAssets from './myInfo/MyAssets.vue'
import MyPattern from './myInfo/MyPattern.vue'

export default {
  components: {
    MyAssets,
    MyReport,
    MyPattern
},
}
</script>

<style scoped>
</style>