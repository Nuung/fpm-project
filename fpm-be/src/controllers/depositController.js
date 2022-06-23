'use strict';

import {
    deleteDepositAll,getTotalDepoAmt
} from '../service/depositService.js';

import { makeDepositDumpData } from '../models/data_generate/depositDump.js';

// dump data 만들기
export const makeDumpDeposit = async (req, res) => {
    try {
        await makeDepositDumpData();
        return res.status(201).json({msg: "Deposit dump data 생성 성공"});
    } catch (error) {
        return res.status(400).json({msg: "Deposit dump data 생성 실패"});
    }
};

// dump data 겸 모든 Deposit 지우기
export const deletAllDeposit = async (req, res) => {
    try {
        const result = await deleteDepositAll();
        return res.status(201).json({msg: `Deposit delete all ${result}개 삭제 성공`});
    } catch (error) {
        return res.status(400).json({msg: "Deposit delete all 실패"});   
    }
};

// total amt 구하기
export const getTotalAmt = async (req,res) => {
    try {
        const result = await getTotalDepoAmt(req.body.userId);
        return res.status(201).json({msg: result});
    } catch (error) {
        return res.status(400).json({msg: "total amount 연산 실패"});
    }
};

/*
notion schema impl

1) 내 자산 top3
전부 total amt 구해서 리스트에 넣고 desc, limit 3

2) 총 자산
순자산으로 표현, 예금+투자

3) 상위 몇 퍼?
해시태그 활성화된 거 total amt 검색
유저아이디, amt 매핑
정렬 후 계산

4) 
*/