import mongoose from 'mongoose';

/**
 * @descrpition 
 * 소비패턴 : {
 *     "저번달": [카페int, 교통비int, 편의점int, 음식점int, 쇼핑int],
 *     "이번달": [카페int, 교통비int, 편의점int, 음식점int, 쇼핑int]
 * }
 */


// 몽구스 스키마 - 필드 정의
const financialDetailSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    mostSpend: String,     // 가장 많은 지출 항목 - deposit
    mostSpendAmt: Number,  // 가장 많은 지출 항목 금액 - deposit
    leastSpend: String,    // 가장 적은 지출 항목 - deposit
    leastSpendAmt: Number, // 가장 적은 지출 항목 금액 - deposit
    depositTotalAmt: Number,      // 총 일반 예금 금액(현금) - deposit
    insureAmt: Number,     // 총 보험 금액 - 가라데이터
    irpAmt: Number,        // 총 IRP 금액 - 가라데이터
    stockAmt: Number,      // 총 투자 금액 - stock 
    realAmt: Number,       // 총 실무자산 금액 - 가라데이터
    loanAmt: Number,       // 총 부채 금액  - loan
    spendCategory: Object, // 소비패턴 - deposit
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
financialDetailSchema.set('collection', 'financialDetail'); 

// 모델만들고 내보내기
const FinancialDetail = mongoose.model("FinancialDetail", financialDetailSchema);
export default FinancialDetail;
