
import Deposit from "../deposit.js";
import User from "../user.js";


/**
 * 
 * @param {*} str ex) 20220101
 * @returns Date Object
 */
const parseDate = (str) => {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    const y = str.substr(0,4),
          m = str.substr(4,2),
          d = str.substr(6,2);
    return new Date(y,m,d);
}


/**
 * 
 * @param {*} start ex) parseDate("20220101")
 * @param {*} end ex) parseDate("20220130")
 * @returns "20220122"
 */
const randomDate = (start, end) => {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
};

const randomCategory = () => {
    const category = ["뮤지컬", "독서", "영화", "베이커리", "카페", "아이돌", "편의점", "의류", "화장품", "외식", "게임", "스포츠", "병원", "교통", "생필품"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
};

const randomType = () => {
    const category = ["입금", "출금"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
};

const randomBankName = () => {
    const category = ["신한은행", "하나은행", "국민은행", "토스뱅크", "카카오뱅크", "농협", "신협"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];    
}

/**
 * @param {*} howMany ex) resList를 몇개나 만들건지, 이것 또한 랜덤값으로
 * @returns 
 */
const makeResList = (howMany) => {
    const returnResList = new Array();
    for (let i = 0; i < howMany; i++) {

        // 입출금 랜덤 - 그에 따른 +- 부호 세팅
        const inoutType = randomType();
        // let tranAmt = "";
        // if (inoutType === "출금") tranAmt = `-${(Math.floor(Math.random() * (1000 - 10 + 1)) + 10) * 100}`
        // else tranAmt = `${(Math.floor(Math.random() * (1000 - 10 + 1)) + 10) * 100}`
            
        // 데이터 insert
        returnResList.push({
            tranDate: randomDate(parseDate("20220501"), parseDate("20220631")),
            tranTime: "11300",
            inoutType: inoutType, // "입금" or "출금",
            tranType: "현금",
            printedContent: randomCategory(), // 여기에 분류 넣자 그냥
            tranAmt: `${(Math.floor(Math.random() * (1000 - 10 + 1)) + 10) * 100}`,
            after_balanceAmt: "-1000000",  // 안쓰는 값
            branchName: "분당점"
        });
    }
    return returnResList;
};

const typeOfTransaction = () => {
    // 5 ~ 100개 사이로 resList 랜덤 생성
    const newResList = makeResList(Math.floor(Math.random() * (100 - 5 + 1)) + 5);
    return {
        apiTranId: "2ffd133a-d17a-431d-a6a5",
        apiTranDtm: "20190910101921567",
        rspCode: "A0000",
        rspMessage: "",
        bankTranId: "F123456789U4BC34239Z",
        bankTranDate: "20190910",
        bankCodeTran: "097",
        bankRspCode: "000",
        bankRspMessage: "",
        bankName: randomBankName(),
        fintech_useNum: "123456789012345678901234",
        balanceAmt: (Math.floor(Math.random() * (100000000 - 1000000 + 1)) + 1000000) * 100,
        pageRecordCnt: "25",
        nextPageYn: "Y",
        beforInquiryTraceInfo: "1T201806171",
        resList: newResList
    };
};


export const makeDepositDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const {bankTranId, bankTranDate, bankCodeTran, 
                bankName, balanceAmt, resList} = typeOfTransaction();            
            const newDeposit = new Deposit({
                userId: user.userId,
                bankTranId: bankTranId,
                bankTranDate: bankTranDate,
                bankCodeTran: bankCodeTran,
                bankName: bankName,
                balanceAmt: balanceAmt,
                resList: resList
            });
            await newDeposit.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};