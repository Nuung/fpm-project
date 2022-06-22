
import Deposit from "../deposit.js";
import User from "../user.js";

/**
 * 
 * @param {*} str ex) 20220101
 * @returns Date Object
 */
const parseDate = (str) => {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0,4),
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


const makeResList = (howMany) => {
    const returnResList = new Array();
    for (let i = 0; i < howMany; i++) {
        returnResList.push({
            tran_date: randomDate(parseDate("20220601"), parseDate("20220631")),
            tran_time: Math.floor(Math.random() * 10000 + "00"),
            inout_type: "입금",
            tran_type: "현금",
            printed_content: "통장인자내용",
            tran_amt: "450000",
            after_balance_amt: "-1000000",
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
        bank_name: "오픈은행",
        fintech_use_num: "123456789012345678901234",
        balance_amt: Math.floor(Math.random() * 1000000 + "00"), // 이거 가변값으로
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