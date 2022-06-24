
import Stock from "../stock.js";
import User from "../user.js";

const mappingFirm = {
    "유안타증권":"A0001",
    "KB증권":"A0002",
    "상상인증권":"A0003",
    "BNK투자증권":"A0004",
    "IBK투자증권":"A0005",
    "미래에셋증권":"A0006",
    "삼성증권":"A0007",
    "한국투자증권":"A0008",
    "NH투자증권":"A0009",
    "교보증권":"A0010",
    "현대차증권":"A0011",
    "키움증권":"A0012",
    "이베스트투자증권":"A0013",
    "SK증권":"A0014",
    "대신증권":"A0015",
    "메리츠증권":"A0016",
    "한화투자증권":"A0017",
    "하나금융투자":"A0018",
    "토스증권":"A0019"
};

/**
 * 
 * @param {*} str ex) 20220101
 * @returns Date Object
 */
const parseDate = (str) => {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    const y = str.substr(0,4),
          m = str.substr(4,2),
          d = str.substr(6,2);
    return new Date(y,m,d);
}


/**
 * 
 * @param {*} start ex) parseDate("20220101")
 * @param {*} end ex) parseDate("20220130")
 * @returns "20220122"
 */
const randomDate = (start, end) => {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
};

const randomStockFirmName = () => {
    const category = ["유안타증권","KB증권","상상인증권","BNK투자증권","IBK투자증권",
    "미래에셋증권","삼성증권","한국투자증권","NH투자증권","교보증권","현대차증권",
    "키움증권","이베스트투자증권","SK증권","대신증권","메리츠증권","한화투자증권","하나금융투자",
    "토스증권"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
};

const randomStockName = () => {
    const category = ["삼성전자", "LG전자", "테슬라", "애플", "신세계", "농심", "오뚜기",
    "포스트","웅진","노스페이스","인텔","위메프","아이디어노믹스","SK하이닉스","롯데","아시아나항공",
    "대한항공","곰표","마이크로소프트","위챗","알리바바","SPC","JYP","YG","SM","HYBE","CUBE",
    "나이키","아디다스","뉴발란스","에이블리","브랜디","지그재그","카카오","우아한형제들","네이버","쿠팡"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];    
};

const randomStockCode = () => {
    const chr = 'abcdefghijklmnopqrstuvwxyz';
    
    let randomCode = '';
    for(let j = 0; j < 5; j++){
        randomCode += chr[Math.floor(Math.random() * chr.length)];
    }

    return randomCode;
};

const randomType = () => {
    const category = ["매수", "매도"];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
};
const randomTranId = () => {
    const chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-_1234567890';
    
    let randomCode = '';
    for(let j = 0; j < 23; j++){
        randomCode += chr[Math.floor(Math.random() * chr.length)];
    }

    return randomCode;
};
/**
 * @param {*} howMany ex) resList를 몇개나 만들건지, 이것 또한 랜덤값으로
 * @returns 
 */
const makeStockList = (howMany) => {
    const returnStockList = new Array();
    for (let i = 0; i < howMany; i++) {

        // 데이터 insert
        returnStockList.push({
            tran_date : randomDate(parseDate("20220401"), parseDate("20220531")),
            tran_time : new Date().getTime, //거래 시간
            inout_type : randomType(), //매수·매도 구분
            stock_code : randomStockCode(), //주식 코드
            stock_name : randomStockName(), //주식 이름
            stock_cnt : (Math.floor(Math.random() * (600 - 1 + 1))), //주식 보유 수(예. 삼성전자 `7주`)
            stock_amt : (Math.floor(Math.random() * (10000 - 100 + 1)) + 100) //주식 보유 액(예. 128만원)
        });
    }
    return returnResList;
};

const typeOfStock = () => {
    // 5 ~ 100개 사이로 resList 랜덤 생성
    const newStockList = makeStockList(Math.floor(Math.random() * (100 - 5 + 1)) + 5);
    return {
        stockTranId: randomTranId(),
        stockTranDate: randomDate(),
        stockFirmName: randomStockFirmName(),
        stockFirmCodeTran: mappingFirm[stockFirmName],
        cratedAt:randomDate(),
        earningRate:(Math.floor(Math.random() * (250-200)) -200),
        stockList: newStockList
    };
};


export const makeStockDumpData = async () => {
    try {
        const userList = await User.find({});
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const {stockTranId, stockTranDate, stockFirmName, 
                stockFirmCodeTran, earningRate, stockList} = typeOfStock();            
            const newStock = new Stock({
                userId: user.userId,
                stockTranId: stockTranId,
                stockTranDate: stockTranDate,
                stockFirmCodeTran: stockFirmCodeTran,
                stockFirmName: stockFirmName,
                earningRate: earningRate,
                stockList: stockList
            });
            await newStock.save();            
        }
    } catch (error) {
        console.error(error);
        throw error;        
    }  
};