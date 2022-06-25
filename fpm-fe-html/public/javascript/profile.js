'use strict';

// 변수 선언부
const userId = 'bhm7266';//document.cookie.getElementById("userID");
let nickName = '';
let hashTag= null;
let follwer = 0;
let depositAmt = 0;
let insureAmt = 0;
let irpAmt = 0;
let stockAmt = 0;
let realAmt = 0;

//get user info 후 변수에 저장
export const getUser = () => {
    fetch("http://api.fpm.local/api/user/"+userId,{
            headers :{
                'Content-Type': 'application/json',
                'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJobTcyNjYiLCJpYXQiOjE2NTYxMjQ3ODcsImV4cCI6MTY4NzY2MDc4NywiaXNzIjoiZnBtIn0.25uY1FLmUWx1ftYqk0Ra7XgV6m7Q_i9L6ZIG-rp9izk'
            }
        }) 
        .then(response => {
            console.dir(response); //response의 데이터
            return response.json();
        })
        .then(data => {
            nickName = data.user.nickName;
            hashTag=data.user.hashtag;
            follwer=data.user.follwer;

            //console.log(nickName);
            //console.log(hashTag);
            //console.log(follwer);
        }).catch(err => {
            console.warn(err);
        });
};

//get financial detail 후 변수에 저장
export const getFinancialDetail = () => {
    fetch("http://api.fpm.local/api/financial/"+userId,{
            headers :{
                'Content-Type': 'application/json',
                'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJobTcyNjYiLCJpYXQiOjE2NTYxMjQ3ODcsImV4cCI6MTY4NzY2MDc4NywiaXNzIjoiZnBtIn0.25uY1FLmUWx1ftYqk0Ra7XgV6m7Q_i9L6ZIG-rp9izk'
            }
        }) 
        .then(response => {
            //console.log(response);
            console.dir(response); //response의 데이터
            return response.json();
        })
        .then(data => {
            depositAmt = data.data.userFinancialDetail[0].depositTotalAmt;
            insureAmt=data.data.userFinancialDetail[0].insureAmt;
            irpAmt=data.data.userFinancialDetail[0].irpAmt;
            stockAmt=data.data.userFinancialDetail[0].stockAmt;
            realAmt=data.data.userFinancialDetail[0].realAmt;
        }).catch(err => {
            console.warn(err);
        });
};

//getUser();
getFinancialDetail();

