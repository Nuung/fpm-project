'use strict';

import {
    deleteStockAll,
    findStockAllByUserId,
} from '../service/stockService.js';
import { findUserById } from '../service/userService.js';

import { makeStockDumpData } from '../models/data_generate/stockDump.js';


// Auth 값 기반으로 자신의 stock 정보 모두 얻어오기
export const getAllStocks = async (req, res) => {
    if (req.user.id) {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
                
        const userStocks = await findStockAllByUserId(user.userId);
        const data = {
            user,
            userStocks,
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
export const makeDumpStock = async (req, res) => {
    try {
        await makeStockDumpData();
        return res.status(201).json({msg: "stock dump data 생성 성공"});
    } catch (error) {
        return res.status(400).json({msg: "stock dump data 생성 실패"});
    }
};

// dump data 겸 모든 stock 지우기
export const deleteAllStock = async (req, res) => {
    try {
        const result = await deletestockAll();
        return res.status(201).json({msg: `stock delete all ${result}개 삭제 성공`});
    } catch (error) {
        return res.status(400).json({msg: "stock delete all 실패"});   
    }
};
