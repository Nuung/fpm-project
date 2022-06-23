import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const loanSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    tran_date : String, // 거래 일자
    tran_time : String, // 거래 시간
    company_code : String, // 대출 상품 회사 코드
    company_name : String, // 대출 상품 회사 명
    loan_code : String, // 대출 상품 코드
    loan_name : String, // 대출 상품 이름
    loan_amt : Number, // 대출 액(예. 128만원)
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
