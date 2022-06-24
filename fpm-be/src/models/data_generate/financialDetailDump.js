
import FinancialDetail from "../financialDetail.js";
import Deposit from "../deposit.js";
import Loan from "../loan.js";
// import Stock from "../stock.js";

import User from "../user.js";

// 가장 많은 지출 항목과 해당 금액
// 가장 적은 지출 항목과 해당 금액
// 소비패턴 가져오기 - 항목은 user.hashtag 값임
const getToalAmtDepost = (user) => {
    const userDeposits = await Deposit.find({ userId: user.userId }).exec();
    for (let i = 0; i < array.length; i++) {
        const userDeposit = userDeposits[i];

        
    }
};



const typeOfFinancialDetail = (user) => {
    return {
        mostSpend : "",         // 가장 많은 지출 항목 - deposit
        mostSpendAmt : 0,       // 가장 많은 지출 항목 금액 - deposit
        leastSpend : "",        // 가장 적은 지출 항목 - deposit
        leastSpendAmt : 0,      // 가장 적은 지출 항목 금액 - deposit
        depositTotalAmt : 0,    // 총 일반 예금 금액(현금) - deposit
        insureAmt : 0,          // 총 보험 금액 - 가라데이터
        irpAmt: 0,              // 총 IRP 금액 - 가라데이터
        stockAmt: 0,            // 총 투자 금액 - stock 
        realAmt: 0,             // 총 실무자산 금액 - 가라데이터
        loanAmt : 0,            // 총 부채 금액  - loan
        spendCategory: {        // 소비패턴 - deposit
            "before": [],
            "after": []
         },
    };
};


export const makeFinancialDetailDumpData = async () => {
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