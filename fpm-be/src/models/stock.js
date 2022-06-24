import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const stockSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    stockTranId: String,
    stockTranDate: Date,
    stockFirmCodeTran: String,
    stockFirmName: String,
    stockList: Array,
    earningRate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
stockSchema.set('collection', 'stock'); 

// 모델만들고 내보내기
const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
