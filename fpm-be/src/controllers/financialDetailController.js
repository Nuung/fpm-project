'use strict';

import {
    findFinancialDetailByUserId,
    deleteFinancialDetailAll,
    findFinancialRankByUser,
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
    };
    return res.status(200).json({ data });
};


// hashtag에 따른 유저 랭크 return
export const getUserFinancialRank = async (req, res) => {
    
    if (req.user.id) {
        const user = await findUserById(req.user.id);
        
        // 데이터 검사 및 정규화 
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });
        }
        if (!req.query.hashtag || req.query.hashtag.length == 0) {
            if (user.hashtag.length === 0) {
                const error = '잘못된 요청입니다.';
                return res.status(400).json({ error });
            }
            else req.query.hashtag = user.hashtag;
        }
        else req.query.hashtag = JSON.parse(req.query.hashtag);

        // 집합에서 등수 구해서 주기
        const userRank = await findFinancialRankByUser(user, req.query.hashtag);

        // return user model data 조절하기
        delete user._doc._id;
        delete user._doc.password;
        const data = {
            user,
            userRank
        };
        return res.status(200).json({ data });
    }
    else {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });
    }
};


// 로그인한 유저가 다른 사람의 Rank 가 궁금할때 호출
export const getUserFinancialRankById = async (req, res) => {

    if (req.user.id) {
        const reqUser = await findUserById(req.user.id);
        const targetUser = await findUserById(req.params.userId);
        
        // 데이터 검사 및 정규화 
        if (!targetUser || !reqUser) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });
        }

        // 집합에서 등수 구해서 주기
        const targetUserRank = await findFinancialRankByUser(targetUser, targetUser.hashtag);
        
        // return user model data 조절하기
        delete targetUser._doc._id;
        delete targetUser._doc.password;
        const data = {
            user: targetUser,
            userRank: targetUserRank
        };
        return res.status(200).json({ data });        
    }
    else {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });
    }

};

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