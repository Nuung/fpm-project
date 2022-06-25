  <template>
    <div class="wrapper">
      <div class="header">
        <span class="logo">FPM</span><span class="alarm"><font-awesome-icon icon="bell" /></span>
      </div>
      <div class="basic-info">
        <p>{{ data }} 씨의 총 자산</p>
        <h3><b>{{ totalAsset }} 원</b></h3>
      </div>
      <div class="hashtags">
        <span>전체</span>
        <span v-for="tag in hashtags" :key="tag">{{ tag }}</span>
        <span>더보기</span>
      </div>
      <my-info v-if=this.isTotal></my-info>
      <group-info v-if=!this.isTotal></group-info>
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
      nickName: "",
      totalAsset: 0,
      hashtags: [],
      isTotal: true,
      data: null
    }
  },
  computed: {
    authToken(){
      return this.$store.state.authToken
    },
    userId(){
      return this.$store.state.userId
    },
  },
  created() {
    const fetchData = async () => {
      const { data: data} = await this.axios.get('/api/financial');
      const { data: user_hashtag } = await this.axios.get('/api/user/'+this.$store.state.userId+'/hashtag');
      this.data = data;
      this.hashtags = user_hashtag.user_hashtag;
    };

    fetchData();
  },
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    width: 100vw;
  }
  .hashtags > span{
    display: inline-block;
    border: #CBB3FF 1px solid;
    width: 30vw;
  }
  .header{
    display: flex;
    justify-content: space-between;
    font-size: 3vh;
  }
</style>