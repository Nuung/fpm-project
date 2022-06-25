'use strict';

// event
const loginEvent = async () => {

  const requestBody = {
    'userId': document.getElementById("id").value,
    'password': document.getElementById("pw").value
  };

  await fetch("http://fpm.local/api/user/login",{
          method: 'POST',
          headers :{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
      }) 
      .then(response => {
        if (response.ok && response.status == 201) {
          return response.json();
        }
        else {
          alert("로그인 실패, id pw 확인");
          throw Error("로그인 실패, id pw 확인");
        }
      })
      .then((res) => {
        alert("로그인 성공");
      })
      .catch(err => {
        alert(err);
        location.href="../index.html";
      });

      getFinancialDetail();
      //return location.href="mainPage.html";
};
//getCookie
const getCookie = (cName) =>{
  cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';
  if(start != -1){
    start += cName.length;
    var end = cookieData.indexOf(';', start);
    if(end == -1)end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  console.log(document.cookie);
  return cValue;
}

//getFinancialDetail
const getFinancialDetail = () => {
  const authorization = getCookie('jwt_token');
  //const userId = getCookie('userId');
  console.log(authorization);
  //console.log('cookie');
  //console.log(document.cookie);

  fetch("http://api.fpm.local/api/financial/"+userId,{
    headers:{
      'authorization':authorization
    }
  }) 
      .then(response => {
          //console.log(response);
          console.dir(response); //response의 데이터
          return response.json();
      })
      .then(data => {
          console.log(data);
          const {nickName,hashtag,follwer} = data.user;
          const {depositTotalAmt,insureAmt,irpAmt,stockAmt,realAmt} = data.userFinancialDetail;

          //cookie setting
          document.cookie = `nickName=${nickName}`;
          document.cookie = `hashTag=${hashtag}`;
          document.cookie = `follwer=${follwer}`;
          document.cookie = `depositAmt=${depositTotalAmt}`;
          document.cookie = `insureAmt=${insureAmt}`;
          document.cookie = `irpAmt=${irpAmt}`;
          document.cookie = `stockAmt=${stockAmt}`;
          document.cookie = `realAmt=${realAmt}`;
      }).catch(err => {
          console.warn(err);
      });
};

// dom ready init function
const init = () => {
  const loginBtn = document.getElementById("btn");
  loginBtn.addEventListener("click", (event) => {
    loginEvent();
  });
};



document.addEventListener("DOMContentLoaded", function(){
  
  // Handler when the DOM is fully loaded
  init();

});
