
import Deposit from "../deposit";


const type_of_transaction = {
    api_tran_id: "2ffd133a-d17a-431d-a6a5",
    api_tran_dtm: "20190910101921567",
    rsp_code: "A0000",
    rsp_message: "",
    bank_tran_id: "F123456789U4BC34239Z",
    bank_tran_date: "20190910",
    bank_code_tran: "097",
    bank_rsp_code: "000",
    bank_rsp_message: "",
    bank_name: "오픈은행",
    fintech_use_num: "123456789012345678901234",
    balance_amt: "1000000",
    page_record_cnt: "25",
    next_page_yn: "Y",
    befor_inquiry_trace_info: "1T201806171",
    res_list: [
        {
            tran_date: "20190910",
            tran_time: "113000",
            inout_type: "입금",
            tran_type: "현금",
            printed_content: "통장인자내용",
            tran_amt: "450000",
            after_balance_amt: "-1000000",
            branchName: "분당점"
        }
    ]
};


export const make_deposit_dump_data = () => {
    try {
        
    } catch (error) {
        
    }  
};