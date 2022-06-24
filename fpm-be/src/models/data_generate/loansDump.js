
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
        tranDate : randomDate(parseDate("20220501"), parseDate("20220631")), // 거래 일자
        tranTime : String(Date.now()), // 거래 시간
        companyCode : "FFF00", // 대출 상품 회사 코드
        companyName : "국민은행", // 대출 상품 회사 명
        loanCode : "FC234F", // 대출 상품 코드
        loanName : "직장인스마트론", // 대출 상품 이름
        loanAmt : (Math.floor(Math.random() * (1000000 - 100000 + 1)) + 1000000) * 100, // 대출 액(예. 128만원)
    };
};


export const makeLoanDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const {tranDate, tranTime, companyCode, 
                companyName, loanCode, loanName, loanAmt} = typeOfLoans();            
            const newLoan = new Loan({
                userId: user.userId,
                tranDate: tranDate,
                tranTime: tranTime,
                companyCode: companyCode,
                companyName: companyName,
                loanCode: loanCode,
                loanName: loanName,
                loanAmt: loanAmt
            });
            await newLoan.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};