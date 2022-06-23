import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const depositSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    bank_tran_id: String,
    bank_tran_date: Date,
    bank_code_tran: String,
    bank_name: String,
    balance_amt: Number,
    res_list: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// collection 이름 정하기
depositSchema.set('collection', 'deposit'); 

// 모델에 간단한 메서드 추가
depositSchema.methods.generate_test_data = function () {
    return this.nickName || this.userId;
};

// 모델만들고 내보내기
const Deposit = mongoose.model("Deposit", depositSchema);
export default Deposit;
