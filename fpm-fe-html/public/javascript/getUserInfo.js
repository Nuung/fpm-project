'use strict';

//get financial detail 후 쿠키에 저장
export const getFinancialDetail = () => {
    const authorization = document.cookie.jwt_token;
    const userId = document.cookie.userId;
    console.log(authorization);
    console.log(document.cookie);

    fetch("http://api.fpm.local/api/financial/"+userId,{
            headers :{
                'Content-Type': 'application/json',
                'authorization':authorization
            }
        }) 
        .then(response => {
            //console.log(response);
            console.dir(response); //response의 데이터
            return response.json();
        })
        .then(data => {
            const {nickName,hashtag,follwer} = data.user;
            const {depositTotalAmt,insureAmt,irpAmt,stockAmt,realAmt} = data.userFinancialDetail;

            //cookie setting
            document.cookie = `nickName=${nickName}`;
            document.cookie = `hashTag=${hashtag}`;
            document.cookie = `follwer=${follwer}`;
            document.cookie = `depositAmt=${depositTotalAmt}`;
            document.cookie = `insureAmt=${insureAmt}`;
            document.cookie = `irpAmt=${irpAmt}`;
            document.cookie = `stockAmt=${stockAmt}`;
            document.cookie = `realAmt=${realAmt}`;
        }).catch(err => {
            console.warn(err);
        });
};