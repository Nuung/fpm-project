'use strict';

// event
const loginEvent = () => {

  const requestBody = {
    'userId': document.getElementById("id").value,
    'password': document.getElementById("pw").value
  };

  fetch("http://fpm.local/api/user/login",{
          method: 'POST',
          headers :{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
      }) 
      .then(response => {
        console.log(response);
        if (response.ok && response.status == 201) {
          document.cookie = "jwt_token="+response['data']['token'];
          alert("로그인 성공");  
          console.log(document.cookie);
          return location.href="mainPage.html";
        }
        else {
          alert("로그인 실패, id pw 확인");  
        }
      })
      .catch(err => {
        alert("로그인 실패! 메인 화면으로 돌아갑니다");
        location.href="../index.html";
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
