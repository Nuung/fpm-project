'use strict';

import {
    findFinancialDetailByUserId,
    deleteFinancialDetailAll,
} from '../service/financialDetailService.js';
import { findUserById } from '../service/userService.js';

import { makeFinancialDetailDumpData } from '../models/data_generate/financialDetailDump.js';


// Auth 값 기반으로 자신의 deposit 정보 모두 얻어오기
export const getFinancialDetail = async (req, res) => {
    if (req.user.id) {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        
        const userFinancialDetail = await findFinancialDetailByUserId(user.userId);
        const data = {
            user,
            userFinancialDetail,
        }
        return res.status(200).json({ data });
    }
    else {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });
    }
};


// auth 만 태우고, id 값으로 원하는 상대 FinancialDetail 얻어오기
export const getFinancialDetailById = async (req, res) => {
    const user = await findUserById(req.params.userId);
    if (!user) {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });            
    }

    const userFinancialDetail = await findFinancialDetailByUserId(req.params.userId);
    
    // return user model data 조절하기
    delete user._doc._id;
    delete user._doc.password;
    const data = {
        user,
        userFinancialDetail,
    }
    return res.status(200).json({ data });
}

// ===================================================================================== //


// dump data 만들기
export const makeDumpFinancialDetail = async (req, res) => {
    try {
        await makeFinancialDetailDumpData();
        return res.status(201).json({msg: "FinancialDetail dump data 생성 성공"});
    } catch (error) {
        return res.status(400).json({msg: "FinancialDetail dump data 생성 실패"});
    }
};

// dump data 겸 모든 FinancialDetail 지우기
export const deletAllFinancialDetail = async (req, res) => {
    try {
        const result = await deleteFinancialDetailAll();
        return res.status(201).json({msg: `FinancialDetail delete all ${result}개 삭제 성공`});
    } catch (error) {
        return res.status(400).json({msg: "FinancialDetail delete all 실패"});   
    }
};