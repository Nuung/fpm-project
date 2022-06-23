/*
* @description 계좌 거래내역 클래스
*/
class Transaction {
    constructor(tran_date,tran_time,inout_type,tran_type,printed_content,tran_amt,after_balance_amt,branchName) {
        this.tran_date = tran_date;
        this.tran_time = tran_time;
        this.inout_type = inout_type;
        this.tran_type = tran_type;
        this.printed_content = printed_content;
        this.tran_amt = tran_amt;
        this.after_balance_amt = after_balance_amt;
        this.branchName = branchName;
    }
}

export default Transaction;
