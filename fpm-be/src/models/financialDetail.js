import mongoose from 'mongoose';

/**
 * @descrpition 
 * 가장 많은 지출 항목 : str
 * 가장 많은 지출 항목 금액 : int
 * 가장 적은 지출 항목 : str
 * 가장 적은 지출 항목 금액 : int
 * 일반 예금 금액(현금) : int
 * 보험 금액 : int
 * IRP 금액 : int
 * 투자 : int
 * 실무자산 : int
 * 부채 : int
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
