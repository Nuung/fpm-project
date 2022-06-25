'use strict';

const login = (id,pw) => {
  fetch("http://fpm.local/api/user/login",{
          method: 'POST',
          headers :{
              'Content-Type': 'application/json',
          },
          body:{
            'userId':id,
            'password':pw
          }
      }) 
      .then(response => {
          return location.href="mainPage.html";
      })
      .catch(err => {
        console.log("로그인 실패! 메인 화면으로 돌아갑니다");
        //return location.href="../index.html";
      });
};

login('bhm7266','');