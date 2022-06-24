
import FinancialDetail from "../financialDetail.js";
import Deposit from "../deposit.js";
import Loan from "../loan.js";
// import Stock from "../stock.js";

import User from "../user.js";


const parseDate = (str) => {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    const y = str.substr(0,4),
          m = str.substr(4,2),
          d = str.substr(6,2);
    return new Date(y,m,d);
}


const getFirstKeyInMap = (map) => [...map][0][0]; 
const getFirstValueInMap = (map) => [...map][0][1];
const getLastKeyInMap = (map) => [...map][map.size-1][0];
const getLastValueInMap = (map) => [...map][map.size-1][1];

// 가장 많은 지출 항목과 해당 금액
// 가장 적은 지출 항목과 해당 금액
// 소비패턴 가져오기 - 항목은 user.hashtag 과 같은 형식으로 이뤄짐
const getTotalDepost = (userDeposits) => {
    const returnObject = {
        mostSpend: "",
        mostSpendAmt: 0,
        leastSpend: "",
        leastSpendAmt: 0,
        depositTotalAmt: 0,
        spendCategory: {
            "before": new Array(),   // 저번달
            "after": new Array(),    // 이번달
        }
    }

    const tempBeforeMap = new Map();
    const tempAfterMap = new Map();

    // 전체 Deposit 대상
    for (let i = 0; i < userDeposits.length; i++) {
        const userDeposit = userDeposits[i];
        
        returnObject.depositTotalAmt += userDeposit.balanceAmt;
        
        // resList를 그냥 Map으로 만들어빔
        // {key(printedContent): value(Sum of tranAmt)}
        for (let i = 0; i < userDeposit.resList.length; i++) {
            const res = userDeposit.resList[i];

            // 날짜 비교를 위해 res.tranDdate 를 date type으로 casting하고
            // casting된 type을 Date object와 비교 연산을 해야함
            const objTarnDate = parseDate(res.tranDdate);
            
            // invalid date
            // 2022-06-30T15:00:00.000Z
            // false

            console.log(objTarnDate);
            console.log(new Date("2022", "06", "01"));
            console.log(objTarnDate < new Date("2022", "06", "01"));

            // 날짜 체크
            if (objTarnDate < new Date("2022", "06", "01")){
                if (tempBeforeMap.has(res.printedContent)) {
                    tempBeforeMap.set(res.printedContent, tempBeforeMap.get(res.printedContent) + res.tranAmt);
                }
                else {
                    tempBeforeMap.set(res.printedContent, res.tranAmt);
                }
            }
            else {
                if (tempAfterMap.has(res.printedContent)) {
                    tempAfterMap.set(res.printedContent, tempAfterMap.get(res.printedContent) + res.tranAmt);
                }
                else {
                    tempAfterMap.set(res.printedContent, res.tranAmt);
                }                
            }
        }
    } // end of large for

    // 내림 차순으로 정렬
    returnObject.spendCategory.before = new Map([...tempBeforeMap].sort((a, b) => b[1] - a[1]));
    returnObject.spendCategory.after = new Map([...tempAfterMap].sort((a, b) => b[1] - a[1]));

    // 마저 완성
    returnObject.mostSpend = getFirstKeyInMap(returnObject.spendCategory.after);
    returnObject.mostSpendAmt = getFirstValueInMap(returnObject.spendCategory.after);
    returnObject.leastSpend = getLastKeyInMap(returnObject.spendCategory.after);
    returnObject.leastSpendAmt = getLastValueInMap(returnObject.spendCategory.after);
    return returnObject;
};



const typeOfFinancialDetail = (userDeposits) => {
    const depositCal = getTotalDepost(userDeposits)

    return {
        mostSpend : depositCal.mostSpend,         // 가장 많은 지출 항목 - deposit
        mostSpendAmt : depositCal.mostSpendAmt,       // 가장 많은 지출 항목 금액 - deposit
        leastSpend : depositCal.leastSpend,        // 가장 적은 지출 항목 - deposit
        leastSpendAmt : depositCal.leastSpendAmt,      // 가장 적은 지출 항목 금액 - deposit
        depositTotalAmt : depositCal.depositTotalAmt,    // 총 일반 예금 금액(현금) - deposit
        insureAmt : 0,          // 총 보험 금액 - 가라데이터
        irpAmt: 0,              // 총 IRP 금액 - 가라데이터
        stockAmt: 0,            // 총 투자 금액 - stock 
        realAmt: 0,             // 총 실무자산 금액 - 가라데이터
        loanAmt : 0,            // 총 부채 금액  - loan
        spendCategory: depositCal.spendCategory
    };
};


export const makeFinancialDetailDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const userDeposits = await Deposit.find({ userId: user.userId }).exec();

            const {mostSpend, mostSpendAmt, leastSpend, 
                leastSpendAmt, depositTotalAmt, insureAmt, 
                irpAmt, stockAmt, realAmt, loanAmt, spendCategory} = typeOfFinancialDetail(userDeposits);

            
            const newFinancialDetail = new FinancialDetail({
                userId: user.userId,
                mostSpend: mostSpend,
                mostSpendAmt: mostSpendAmt,
                leastSpend: leastSpend,
                leastSpendAmt: leastSpendAmt,
                depositTotalAmt: depositTotalAmt,
                insureAmt: insureAmt,
                irpAmt: irpAmt,
                stockAmt: stockAmt,
                realAmt: realAmt,
                loanAmt: loanAmt,
                spendCategory: spendCategory
            });
            await newFinancialDetail.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};