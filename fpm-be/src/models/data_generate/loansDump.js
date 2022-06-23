
import Loan from "../loan.js";
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

const typeOfLoans = () => {
    return {
        tran_date : randomDate(parseDate("20220501"), parseDate("20220631")), // 거래 일자
        tran_time : String(Date.now()), // 거래 시간
        company_code : "FFF00", // 대출 상품 회사 코드
        company_name : "국민은행", // 대출 상품 회사 명
        loan_code : "FC234F", // 대출 상품 코드
        loan_name : "직장인스마트론", // 대출 상품 이름
        loan_amt : (Math.floor(Math.random() * (10000000 - 100000 + 1)) + 1000000) * 100, // 대출 액(예. 128만원)
    };
};


export const makeLoanDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const {tran_date, tran_time, company_code, 
                company_name, loan_code, loan_name, loan_amt} = typeOfLoans();            
            const newLoan = new Loan({
                userId: user.userId,
                tran_date: tran_date,
                tran_time: tran_time,
                company_code: company_code,
                company_name: company_name,
                loan_code: loan_code,
                loan_name: loan_name,
                loan_amt: loan_amt
            });
            await newLoan.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};