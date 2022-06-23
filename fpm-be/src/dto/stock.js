/*
* @description 주식 거래내역 클래스
*/
class Stock {
    constructor(tran_date,tran_time,inout_type,stock_code,stock_name,stock_cnt,stock_amt) {
        this.tran_date = tran_date; //거래 일자
        this.tran_time = tran_time; //거래 시간
        this.inout_type = inout_type; //매수·매도 구분
        this.stock_code = stock_code; //주식 코드
        this.stock_name = stock_name; //주식 이름
        this.stock_cnt = stock_cnt; //주식 보유 수(예. 삼성전자 `7주`)
        this.stock_amt = stock_amt; //주식 보유 액(예. 128만원)
    }
}

export default Stock;
