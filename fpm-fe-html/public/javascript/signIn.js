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
        if (response.ok && response.status == 201) {
          return response.json();
        }
        else {
          alert("로그인 실패, id pw 확인");
          throw Error("로그인 실패, id pw 확인");
        }
      })
      .then((res) => {
        document.cookie = `jwt_token=${res['data']['token']}`;
        console.log(document.cookie);
        alert("로그인 성공");
        return location.href="mainPage.html";
      })
      .catch(err => {
        alert(err);
        //location.href="../index.html";
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
