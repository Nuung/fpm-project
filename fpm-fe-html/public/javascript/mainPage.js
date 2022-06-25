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

      let amts = {
        depositTotalAmt:totalAmt,
        insureAmt:insureAmt,
        irpAmt:irpAmt,
        stockAmt:stockAmt,
        realAmt:realAmt
      }

      let amtsname = {
        depositTotalAmt: '일반 예금',
        insureAmt: '보험',
        irpAmt: 'IRP',
        stockAmt: '주식',
        realAmt: '부동산'
      }

      keysSorted = Object.keys(amts).sort(function(a,b){return amts[b]-amts[a]})
       
      $('#amt1').text(amtsname[keysSorted[0]]);
      $('#amt2').text(amtsname[keysSorted[1]]);
      $('#amt3').text(amtsname[keysSorted[2]]);

      $('#amtamt1').text(amts[keysSorted[0]].toLocaleString());
      $('#amtamt2').text(amts[keysSorted[1]].toLocaleString());
      $('#amtamt3').text(amts[keysSorted[2]].toLocaleString());

      for (let i = 1; i <= 6; i++) {
        $("#hashtag" + i).text(hashtags[i - 1]);
      }
      $("#nickName").text(nickName);
      $("#totalAmt").text((totalAmt+insureAmt+irpAmt+stockAmt+realAmt).toLocaleString());
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