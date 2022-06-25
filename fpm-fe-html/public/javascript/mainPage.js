$(document).ready(function () {

  let token = document.cookie.split('=')[1];

  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/financial",
    headers: {
      authorization:
        token,
    },
    success: function (res) {
      console.log(res);
      let hashtags = res["data"]["user"]["hashtag"];
      let nickName = res["data"]["user"]["nickName"];
      let follower = res["data"]["user"]["follower"];
      let mostSpendAmt = res["data"]["userFinancialDetail"][0]["mostSpendAmt"];
      let leastSpendAmt = res["data"]["userFinancialDetail"][0]["leastSpendAmt"];
      let totalAmt = res["data"]["userFinancialDetail"][0]["depositTotalAmt"];
      let insureAmt = res["data"]["userFinancialDetail"][0]["insureAmt"];
      let irpAmt = res["data"]["userFinancialDetail"][0]["irpAmt"];
      let stockAmt = res["data"]["userFinancialDetail"][0]["stockAmt"];
      let realAmt = res["data"]["userFinancialDetail"][0]["realAmt"];
      let top3Spend = res["data"]["userFinancialDetail"][0]["spendCategory"]["after"];

      localStorage.setItem('hashtag', hashtags);
      localStorage.setItem('nickName', nickName);
      localStorage.setItem('follower', follower);
      localStorage.setItem('mostSpendAmt', mostSpendAmt);
      localStorage.setItem('leastSpendAmt', leastSpendAmt);
      localStorage.setItem('depositTotalAmt', totalAmt);
      localStorage.setItem('insureAmt', insureAmt);
      localStorage.setItem('irpAmt', irpAmt);
      localStorage.setItem('stockAmt', stockAmt);
      localStorage.setItem('realAmt', realAmt);

      for (let i = 1; i <= 6; i++) {
        $("#hashtag" + i).text(hashtags[i - 1]);
      }
      $("#nickName").text(nickName);
      $("#totalAmt").text(totalAmt.toLocaleString());
      let idx = 1;
      $.each(top3Spend, function(key, value){
        //console.log(key, value);
        if(idx > 3) return false;
        $("#spend"+idx).text(key);
        $("#spendAmt"+idx).text(value.toLocaleString());
        idx++;
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("통신 실패.");
    },
  });

  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/user/hashtag/recommand",
    headers: {
      authorization:
        token,
    },
    success: function (res) {
      recomm1 = res['recommandUsers'][0]['nickName'];
      recomm2 = res['recommandUsers'][1]['nickName'];
      recomm3 = res['recommandUsers'][2]['nickName'];

      $("#recommUser1").text(recomm1);
      $("#recommUser2").text(recomm2);
      $("#recommUser3").text(recomm3);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("통신 실패.");
    },
  });
});

$("[id^=hashtag]").on("click", function(){
  $(this).toggleClass('selected');
  let selectedTag = document.querySelector('.selected');
  if(selectedTag === null)
    location.href = "mainPage.js";
  else{
    let id = selectedTag.id;
    location.href = `groupReport.html?${id}`
  }
});

$(window).load(function () {          //페이지가 로드 되면 로딩 화면을 없애주는 것
  $('#loading').hide();
});