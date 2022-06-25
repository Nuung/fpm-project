'use strict';

// get value from cookie
const getCookie = (cName) => {
    cName = cName + '=';
    let cookieData = document.cookie;
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
const sendMsg = async (toUserId, msg) => {
    const requestBody = { toUserId, msg };
    await fetch("http://fpm.local/api/message", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'authorization': getCookie("jwt_token"),
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
            renderSendingMsg(msg);
        })
        .catch(err => {
            console.warn(err);
        });

};

// 
const renderSendingMsg = (msg) => {
    // const chatDiv = document.getElementsByClassName('chat');
    $('#chat--append').append(
        `
        <li>
            <span class="msg--time">
                오전 11:01
            </span> 
            <div class="message">
                <span>${msg}</span>
            </div>
        </li>
        `
    );
};

// dom ready init function
const init = async () => {
    const sendBtn = document.getElementById("sendBtn");
    sendBtn.addEventListener("click", (event) => {
        // sendMsg();
        const chattMsgInput = document.getElementById('chatt');
        sendMsg(getCookie("toUserId"), chattMsgInput.value); 
        chattMsgInput.value = "";
    });
};



document.addEventListener("DOMContentLoaded", function () {

    // Handler when the DOM is fully loaded
    init();

    // polling

});
