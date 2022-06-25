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
      let before = res["data"]["userFinancialDetail"][0]["spendCategory"]['before'];
      let after = res["data"]["userFinancialDetail"][0]["spendCategory"]['after'];

      let beforeSum = 0;
      let afterSum = 0;

      for(key in before){
        beforeSum += before[key];
      }

      for(key in after){
        afterSum += after[key];
      }

      $('#differ').text(Math.round(Math.abs((beforeSum - afterSum)/10000)).toLocaleString());

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

      $('#amtamt1').text(Math.round(amts[keysSorted[0]]/10000).toLocaleString());
      $('#amtamt2').text(Math.round(amts[keysSorted[1]]/10000).toLocaleString());
      $('#amtamt3').text(Math.round(amts[keysSorted[2]]/10000).toLocaleString());

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

  let rand = Math.floor((Math.random() * 2) + 1);
  $('#lifestyle').attr("src","../public/images/lifestyle" + rand + ".png");

  let rands = [];
  while(rands.length < 3){
      let r = Math.floor(Math.random() * 6) + 1;
      if(rands.indexOf(r) === -1) rands.push(r);
  }
  $('#pattern1').attr("src","../public/images/pattern" + rands[0] + ".png");
  $('#pattern2').attr("src","../public/images/pattern" + rands[1] + ".png");
  $('#pattern3').attr("src","../public/images/pattern" + rands[2] + ".png");
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

$(".rectangle-3380").on("click", function(){
  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/user/hashtag/recommand",
    headers: {
      authorization:
      document.cookie.split('=')[1],
    },
    success: function (res) {
      userId = res['recommandUsers'][0]['userId'];
      location.href = `profile.html?${userId}`
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("통신 실패.");
    },
  });
});

$(".rectangle-3381").on("click", function(){
  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/user/hashtag/recommand",
    headers: {
      authorization:
      document.cookie.split('=')[1],
    },
    success: function (res) {
      userId = res['recommandUsers'][1]['userId'];
      location.href = `profile.html?${userId}`
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("통신 실패.");
    },
  });
});

$(".rectangle-3382").on("click", function(){
  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/user/hashtag/recommand",
    headers: {
      authorization:
      document.cookie.split('=')[1],
    },
    success: function (res) {
      userId = res['recommandUsers'][2]['userId'];
      location.href = `profile.html?${userId}`
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("통신 실패.");
    },
  });
});

$(window).load(function () {          //페이지가 로드 되면 로딩 화면을 없애주는 것
  $('#loading').hide();
});