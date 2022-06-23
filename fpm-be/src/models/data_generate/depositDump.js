
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
 * @param {*} howMany ex) res_list를 몇개나 만들건지, 이것 또한 랜덤값으로
 * @returns 
 */
const makeResList = (howMany) => {
    const returnResList = new Array();
    for (let i = 0; i < howMany; i++) {

        // 입출금 랜덤 - 그에 따른 +- 부호 세팅
        const inoutType = randomType();
        let tranAmt = "";
        if (inoutType === "출금") tranAmt = `-${(Math.floor(Math.random() * (1000 - 10 + 1)) + 10) * 100}`
        else tranAmt = `${(Math.floor(Math.random() * (1000 - 10 + 1)) + 10) * 100}`
            
        // 데이터 insert
        returnResList.push({
            tran_date: randomDate(parseDate("20220501"), parseDate("20220631")),
            tran_time: "11300",
            inout_type: inoutType, // "입금" or "출금",
            tran_type: "현금",
            printed_content: randomCategory(), // 여기에 분류 넣자 그냥
            tran_amt: tranAmt,
            after_balance_amt: "-1000000",  // 안쓰는 값
            branchName: "분당점"
        });
    }
    return returnResList;
};

const typeOfTransaction = () => {
    // 5 ~ 50개 사이로 res_list 랜덤 생성
    const newResList = makeResList(Math.floor(Math.random() * (50 - 5 + 1)) + 5);
    return {
        api_tran_id: "2ffd133a-d17a-431d-a6a5",
        api_tran_dtm: "20190910101921567",
        rsp_code: "A0000",
        rsp_message: "",
        bank_tran_id: "F123456789U4BC34239Z",
        bank_tran_date: "20190910",
        bank_code_tran: "097",
        bank_rsp_code: "000",
        bank_rsp_message: "",
        bank_name: randomBankName(),
        fintech_use_num: "123456789012345678901234",
        balance_amt: (Math.floor(Math.random() * (100000000 - 1000000 + 1)) + 1000000) * 100,
        page_record_cnt: "25",
        next_page_yn: "Y",
        befor_inquiry_trace_info: "1T201806171",
        res_list: newResList
    };
};


export const makeDepositDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const {bank_tran_id, bank_tran_date, bank_code_tran, 
                bank_name, balance_amt, res_list} = typeOfTransaction();            
            const newDeposit = new Deposit({
                userId: user.userId,
                bank_tran_id: bank_tran_id,
                bank_tran_date: bank_tran_date,
                bank_code_tran: bank_code_tran,
                bank_name: bank_name,
                balance_amt: balance_amt,
                res_list, res_list
            });
            await newDeposit.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};