'use strict';

let toUserId = '';

// 보낸이의 메시지 불러오기
// 딱 채팅방 클릭하면 해탕 함수가 불러와 지는 것
const getTargetUser = async (userId) => {
    //const authorization = document.cookie;
    await fetch(`/api/messages/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok && response.status == 201) {
                return response.json();
            }
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

// 지금 들어온 채팅 상대방에게 채팅 보내기
const sendMsg = async (toUserId) => {
    const requestBody = {
        "toUserId": toUserId,
        "msg": document.getElementById('chatt').value
    }
    await fetch("http://fpm.local/api/message", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (response.ok && response.status == 201) {
                return response.json();
            }
        })
        .then((res) => {
            
        })
        .catch(err => {
            console.warn(err);
        });

};


// dom ready init function
const init = async () => {
    // getUnreadMsg();

    const sendBtn = document.getElementById("sendBtn");
    sendBtn.addEventListener("click", (event) => {
        sendMsg();
    });
};



document.addEventListener("DOMContentLoaded", function () {

    // Handler when the DOM is fully loaded
    init();

    // polling

});
