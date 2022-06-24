'use strict';

import {
    deleteDepositAll,getTotalDepoAmt,
    findDepositAllByUserId,
} from '../service/depositService.js';
import { findUserById } from '../service/userService.js';

import { makeDepositDumpData } from '../models/data_generate/depositDump.js';


// Auth 값 기반으로 자신의 deposit 정보 모두 얻어오기
export const getAllDeposits = async (req, res) => {
    if (req.user.id) {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
                
        const userDeposits = await findDepositAllByUserId(user.userId);
        const data = {
            user,
            userDeposits,
        }
        return res.status(200).json({ data });
    }
    else {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });
    }
};


// ===================================================================================== //


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
3) 상위 몇 퍼?
해시태그 활성화된 거 total amt 검색
유저아이디, amt 매핑
정렬 후 계산


4) stock dump 데이터 만드는 api
deposit와 똑같이 
*/