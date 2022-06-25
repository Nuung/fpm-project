$(document).ready(function(){
    let token = document.cookie.split('=')[1];
    const selectedTag = location.href.split('?')[1];
    $('#'+selectedTag).toggleClass('selected');
    jQuery('.selected').parent('div').css('background', '#EEE5FF');
    jQuery('.selected').parent('div').css('border-color', '#BA99FF');

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


      $.ajax({
        type: "GET",
        url: "http://api.fpm.local/api/user/hashtag/recommand",
        headers: {
          authorization:
          document.cookie.split('=')[1],
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
      
    $(window).on('load', function () {
      let tag = document.querySelector('.selected').outerText;
      let tagText = [];
      tagText.push(tag);
      let data = JSON.stringify(tagText);

      $.ajax({
        type: "GET",
        url: "http://api.fpm.local/api/financial/user/rank",
        headers: {
          authorization:
            token,
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
      $('#loading').hide();
    });
})

$("[id^=hashtag]").on("click", function(){
  jQuery('.selected').parent('div').css('background', '#FFFFFF');
  jQuery('.selected').parent('div').css('border-color', '#D1D7DF');
  $(this).toggleClass('selected');
  jQuery('.selected').parent('div').css('background', '#EEE5FF');
  jQuery('.selected').parent('div').css('border-color', '#BA99FF');

  let tagText = []
  let selectedTag = document.querySelectorAll('.selected');
  if(selectedTag.length === 0)
    location.href = "mainPage.html";
  for(let i=0; i<selectedTag.length; i++){
    tagText.push(selectedTag[i].outerText)
  }

  let data = {
    hashtag: JSON.stringify(tagText)
  }

  $.ajax({
    type: "GET",
    url: "http://api.fpm.local/api/financial/user/rank",
    headers: {
      authorization:
        token,
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