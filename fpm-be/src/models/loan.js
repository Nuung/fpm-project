import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const loanSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    tranDate : String, // 거래 일자
    tranTime : String, // 거래 시간
    companyCode : String, // 대출 상품 회사 코드
    companyName : String, // 대출 상품 회사 명
    loanCode : String, // 대출 상품 코드
    loanName : String, // 대출 상품 이름
    loanAmt : Number, // 대출 액(예. 128만원)
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
loanSchema.set('collection', 'loan'); 

// 모델만들고 내보내기
const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
