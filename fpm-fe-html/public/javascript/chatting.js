'use strict';

// event
const getUnreadMsg = () => {
    //const authorization = document.cookie;
    fetch("http://fpm.local/api/messages",{
          method: 'GET',
          headers :{
              'Content-Type': 'application/json',
              'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImR3eGtxb2ExbWJ3eWw0ZCIsImlhdCI6MTY1NjE2Njc5NywiZXhwIjoxNjg3NzAyNzk3LCJpc3MiOiJmcG0ifQ.aixB_pLimGhEgoRTDNe-I7loPO8jPpDdkuDpqML9j8s'
          },
      }) 
      .then(response => {
          return response.json();
      })
      .then((res) => {
        console.log(res.allMessage[0]);
      })
      .catch(err => {
        console.warn(err);
      });

};

const sendMsg = () => {

}
// dom ready init function
const init = () => {
    getUnreadMsg();
    const sendBtn = document.getElementById("btn");
    sendBtn.addEventListener("click", (event) => {
        sendMsg();
  });
};



document.addEventListener("DOMContentLoaded", function(){
  
  // Handler when the DOM is fully loaded
  init();

});
