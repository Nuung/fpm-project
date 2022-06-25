$(document).ready(function () {
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

  var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
  var yValues = [55, 49, 44, 24, 15];
  var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "World Wide Wine Production 2018",
      },
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