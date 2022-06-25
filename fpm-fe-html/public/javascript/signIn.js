'use strict';

// event
const loginEvent = async () => {

  const requestBody = {
    'userId': document.getElementById("id").value,
    'password': document.getElementById("pw").value
  };

  await fetch("http://fpm.local/api/user/login", {
    method: 'POST',
    headers: {
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
      document.cookie = `jwt_token=${res.data.token}`;
      // alert("로그인 성공");
    })
    .catch(err => {
      alert(err);
      location.href = "../index.html";
    });
  return location.href = "choiceAsset.html";
};


// //getFinancialDetail
// const getFinancialDetail = async () => {
//   await fetch("http://fpm.local/api/financial", {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((res) => {
//       const { nickName, hashtag, follwer } = res.data.user;
//       const { depositTotalAmt, insureAmt, irpAmt, stockAmt, realAmt } = res.data.userFinancialDetail;

//       //cookie setting
//       document.cookie = `nickName=${nickName}`;
//       document.cookie = `hashTag=${hashtag}`;
//       document.cookie = `follwer=${follwer}`;
//       document.cookie = `depositAmt=${depositTotalAmt}`;
//       document.cookie = `insureAmt=${insureAmt}`;
//       document.cookie = `irpAmt=${irpAmt}`;
//       document.cookie = `stockAmt=${stockAmt}`;
//       document.cookie = `realAmt=${realAmt}`;
//       return true;
//     }).catch(err => {
//       console.warn(err);
//     });
// };

// dom ready init function
const init = () => {
  const loginBtn = document.getElementById("btn");
  loginBtn.addEventListener("click", (event) => {
    loginEvent();
  });
};



document.addEventListener("DOMContentLoaded", function () {

  // Handler when the DOM is fully loaded
  init();

});
