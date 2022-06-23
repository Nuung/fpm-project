'use strict';

import {
    findDepositAllByUserId,
    deleteDepositAll,
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