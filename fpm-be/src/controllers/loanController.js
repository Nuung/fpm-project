'use strict';

import {
    findLoanAllByUserId,
    deleteLoanAll,
} from '../service/loanService.js';
import { findUserById } from '../service/userService.js';

import { makeLoanDumpData } from '../models/data_generate/loansDump.js';


// Auth 값 기반으로 자신의 deposit 정보 모두 얻어오기
export const getAllLoans = async (req, res) => {
    if (req.user.id) {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        
        const userDeposits = await findLoanAllByUserId(user.userId);
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
export const makeDumpLoan = async (req, res) => {
    try {
        await makeLoanDumpData();
        return res.status(201).json({msg: "Loan dump data 생성 성공"});
    } catch (error) {
        return res.status(400).json({msg: "Loan dump data 생성 실패"});
    }
};

// dump data 겸 모든 Loan 지우기
export const deletAllLoan = async (req, res) => {
    try {
        const result = await deleteLoanAll();
        return res.status(201).json({msg: `Loan delete all ${result}개 삭제 성공`});
    } catch (error) {
        return res.status(400).json({msg: "Loan delete all 실패"});   
    }
};