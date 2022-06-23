<template>
  <div>
    <div class="header">
      <top-btn></top-btn>
    </div>
    <div class="basic-info">
      <p><b>금융 요약</b></p>
      <p>{{ userName }}씨의</p>
      <p>총 자산은 {{ totAssets }} 입니다.</p>
    </div>
    <div class="wrap-vertical">
      <span v-for="tag in tagList" :key="tag" :class="{ 'selected': tag.isSelected }">{{ tag.tagName }}</span>
    </div>
    <div>
      <my-page></my-page>
      <group-page></group-page>
    </div>
    <div class="footer">
      <bottom-btn></bottom-btn>
    </div>
  </div>
  
</template>

<script>
import TopBtn from './common/TopBtn.vue';
import MyPage from './MyPage.vue';
import GroupPage from './GroupPage.vue';
import BottomBtn from './common/BottomBtn.vue';

export default {
    components: {
    TopBtn,
    MyPage,
    GroupPage,
    BottomBtn
},
    data() {
      return{
        tagList : [
          {
            tagName : "전체",
            isSelected: true
          },
          {
            tagName : "뮤지컬",
            isSelected: false
          },
          {
            tagName : "독서",
            isSelected: false
          },
          {
            tagName : "인강",
            isSelected: false
          },
          {
            tagName : "BTS",
            isSelected: false
          },
          {
            tagName : "알코올",
            isSelected: false
          },
        ],
      }
    },
    methods: {
      getTagList: function() {
        // ... 
        // 태그리스트 0번은 무조건 '전체', 토글 이벤트때마다 태그리스트 읽어서 selected인 것들 다시 확인
      }
    },
    /*
    computed: {
      userName(){
        return this.$store.state.userName;
      },
      totAssets(){
        return this.$store.state.totAssets;
      }
    }
    */
}
</script>

<style>
  .basic-info{
    text-align: left;
    padding-top: 9vh;
  }

  .wrap-vertical{
    width: 100vw;
    height: 8vh;
    line-height: 8vh;
    overflow: scroll;
    color: #112031;
    /* 가로 스크롤 */
    overflow: auto;
    white-space: nowrap;
  }

  .wrap-vertical > span {
    box-sizing: border-box;
    display: inline-block;
    margin: 0 20px;
  }

.wrap-vertical::-webkit-scrollbar{
    display: none; 
}

.selected{
  font-weight: bold;
  border-bottom: 2px black solid;
}

.header{
  position: fixed;
  top: 0;
}

.footer{
  position: fixed;
  bottom: 0;
}

</style>