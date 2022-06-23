'use strict';

import {
    deleteDepositAll
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