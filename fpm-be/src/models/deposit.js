import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const depositSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    bankTranId: String,
    bankTranDate: Date,
    bankCodeTran: String,
    bankName: String,
    balanceAmt: Number,
    resList: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
depositSchema.set('collection', 'deposit'); 

// 모델만들고 내보내기
const Deposit = mongoose.model("Deposit", depositSchema);
export default Deposit;
