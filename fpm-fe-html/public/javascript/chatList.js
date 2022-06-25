'use strict';

const getCookie = (cName) => {
    cName = cName + '=';
    const cookieData = document.cookie;
    let start = cookieData.indexOf(cName);
    let cValue = '';
    if (start != -1) {
        start += cName.length;
        let end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }

    return cValue;
}

// 메시지 불러오기
const getUnreadMsg = () => {
    const authorization = getCookie('jwt_token');

    fetch("http://fpm.local/api/messages",{
          method: 'GET',
          headers :{
              'Content-Type': 'application/json',
              'authorization': authorization
          },
    }) 
    .then(response => {
        return response.json();
    })
    .then((res) => {
        for(let i =0;i< res.allMessage.length;i++) {
            const {_id,counts,msg,nickName,createdAt} = res.allMessage[i];
            console.log(res.allMessage[i]);
            let chatRoom = `<div class="group-1816"> <div class="text-container"> <a href ="chatting.html?userId=`;
            chatRoom += _id;
            chatRoom += `" ><div class="nickNm fonth3">`;
            chatRoom += nickName;
            chatRoom += `</div> </a><div class="sendDate fontbody3">`;
            chatRoom += createdAt.substring(0,10);
            chatRoom += `</div> </div> <div class="flex-row"> <p class="text-13 pretendard-regular-normal-nevada-16px">`;
            chatRoom += msg;
            chatRoom += `</p> <div class="unRead"> <div class="text-14">+`;
            chatRoom += counts;
            chatRoom += `</div> </div> </div>`;
            chatRoom += `<img class="profileImg" src="../public/images/profile.jpg"/> </div>`;
        
            const list = document.getElementById('list');
            list.innerHTML+=chatRoom;

            console.log(chatRoom);
        }
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
const init = () => {
    getUnreadMsg();
    /*
    const sendBtn = document.getElementById("sendBtn");
    sendBtn.addEventListener("click", (event) => {
        sendMsg();
    });*/
};



document.addEventListener("DOMContentLoaded", function(){
  
  // Handler when the DOM is fully loaded
  init();

});
