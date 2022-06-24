<template>
  <div class="wrapper">
    <div class="header">
      <span class="logo">FPM</span><span class="alarm"><font-awesome-icon icon="bell" /></span>
    </div>
    <div class="basic-info">
      <p>{{ userName }} 씨의 총 자산</p>
      <h3><b>{{ totalAsset }} 원</b></h3>
    </div>
    <div class="hashtags">
      <button>전체</button>
      {{ userId }}
      <button v-for="tag in hashtags" :key="tag">{{ tag }}</button>
      <button>더보기</button>
    </div>
    <my-info v-if=this.isTotal></my-info>
    <group-info v-if=!this.isTotal></group-info>
    <button @click="hashtag">button</button>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import BottomNav from "../common/BottomNav.vue";
import GroupInfo from './GroupInfo.vue';
import MyInfo from './MyInfo.vue';

export default {
  components: { 
    BottomNav,
    MyInfo,
    GroupInfo 
  },
  data() {
    return{
      userName: "",
      totalAsset: 0,
      hashtags: [],
      isTotal: true,
    }
  },
  methods: {
    hashtag(){
      const config = {
      headers: {
        authorization: this.$store.state.authToken
      }
    }

    this.axios.get('/api/user/'+ this.userId +'/hashtag', config)
      .then((result) => {
        this.hashtags = result.user_hashtag;
        alert(this.hashtags);
      })
      .catch(
        alert("오류발생")
      )
    }
  },
  computed: {
    authToken(){
      return this.$store.state.authToken
    },
    userId(){
      return this.$store.state.userId
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    width: 100vw;
  }
  .header{
    display: flex;
    justify-content: space-between;
    font-size: 3vh;
  }
</style>