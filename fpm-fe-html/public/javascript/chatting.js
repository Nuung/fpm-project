'use strict';

let toUserId = '';

// 메시지 불러오기
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
        toUserId = res.allMessage[0]._id;
        console.log(toUserId);
        console.log(res.allMessage[0]);
    })
    .catch(err => {
    console.warn(err);
    });

};

//상대방에게 채팅 보내기
const sendMsg = () => {
    const requestBody = {
        "toUserId":toUserId,
        "msg":document.getElementById('chatt').value
    }
    fetch("http://fpm.local/api/message",{
        method: 'POST',
        headers :{
            'Content-Type': 'application/json',
            'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImR3eGtxb2ExbWJ3eWw0ZCIsImlhdCI6MTY1NjE2Njc5NywiZXhwIjoxNjg3NzAyNzk3LCJpc3MiOiJmcG0ifQ.aixB_pLimGhEgoRTDNe-I7loPO8jPpDdkuDpqML9j8s'
        },
        body: JSON.stringify(requestBody)
    }) 
    .then(response => {
        return getUnreadMsg();
    })
    .catch(err => {
    console.warn(err);
    });
  
}
// dom ready init function
const init = async () => {
    while(true) {
        getUnreadMsg();

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const sendBtn = document.getElementById("sendBtn");
        sendBtn.addEventListener("click", (event) => {
            sendMsg();
        });
    }
};



document.addEventListener("DOMContentLoaded", function(){
  
  // Handler when the DOM is fully loaded
  init();

});
