$(document).ready(function(){

    const selectedTag = location.href.split('?')[1];
    $('#'+selectedTag).toggleClass('selected');
    jQuery('.selected').parent('div').css('background', '#EEE5FF');
    jQuery('.selected').parent('div').css('border-color', '#BA99FF');

    $.ajax({
        type: "GET",
        url: "http://api.fpm.local/api/financial",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNqY2YwaHM1ZmNkazI2MSIsImlhdCI6MTY1NjEzOTIyMSwiZXhwIjoxNjg3Njc1MjIxLCJpc3MiOiJmcG0ifQ.wpt9TFqGXJfAYXTIBSj2BeTBY2vqm-oFEhM91Gi_pKc",
        },
        success: function (res) {
          console.log(res);
          let hashtags = res["data"]["user"]["hashtag"];
          let nickName = res["data"]["user"]["nickName"];
          let totalAmt = res["data"]["userFinancialDetail"][0]["depositTotalAmt"];
          let top3Spend = res["data"]["userFinancialDetail"][0]["spendCategory"]["after"];
          for (let i = 1; i <= 6; i++) {
            $("#hashtag" + i).text(hashtags[i - 1]);
          }
          $(".nickName").text(nickName);
          $(".totalAmt").text(totalAmt.toLocaleString());
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

      let data = {
        hashtag: JSON.stringify(["생필품"])
      }

      $.ajax({
        type: "GET",
        url: "http://api.fpm.local/api/financial/user/rank",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNqY2YwaHM1ZmNkazI2MSIsImlhdCI6MTY1NjEzOTIyMSwiZXhwIjoxNjg3Njc1MjIxLCJpc3MiOiJmcG0ifQ.wpt9TFqGXJfAYXTIBSj2BeTBY2vqm-oFEhM91Gi_pKc",
        },
        data: data,
        success: function (res) {
          let percentage = Math.round(100-res["data"]["userRank"]["percent"]);
          $("#percentage").text(percentage);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("통신 실패.");
        },
      });  
    
})

$("[id^=hashtag]").on("click", function(){
  jQuery('.selected').parent('div').css('background', '#FFFFFF');
  jQuery('.selected').parent('div').css('border-color', '#D1D7DF');
  $(this).toggleClass('selected');
  let selectedTag = document.querySelector('.selected');
  jQuery('.selected').parent('div').css('background', '#EEE5FF');
  jQuery('.selected').parent('div').css('border-color', '#BA99FF');
  if(selectedTag === null)
    location.href = "mainPage.html";
});