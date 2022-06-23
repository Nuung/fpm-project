import mongoose from 'mongoose';

const depositSchema = mongoose.Schema({ // 몽구스 요청하고 필드 정의
    userId: {   //api_tran_id 대신에 userId로 관리
        type: String,
        required: true,
        unique: true
    },
    bank_tran_id: String,
    bank_tran_date: String,
    bank_code_tran: String,
    bank_name: String,
    balance_amt: Number,
    res_list: [] //transaction 객체 배열
});

const Deposit = mongoose.model("Deposit", depositSchema);
export default Deposit;
