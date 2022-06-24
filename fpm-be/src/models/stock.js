import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const stockSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    stockTranId: String, //거래고유번호
    stockTranDate: String, //거래일자
    stockFirmCodeTran: String, //증권사코드
    stockFirmName: String, // 증권사 명
    stockList: Array, // 해당 계좌의 주식 거래 내역
    earningRate: Number, // 수익률
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
