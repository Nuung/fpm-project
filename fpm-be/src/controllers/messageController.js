'use strict';

import {
    createMessage,
} from '../service/messageService.js';
import { findUserById } from '../service/userService.js';

/**
 * @description 메시지 보내기
 * @param {User Model Json} req 
 * @param {리턴 data 참조} res 
 * @returns 
 */
 export const sendMessage = async (req, res) => {

    try {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        else {
            await createMessage(req.body, req.user.id);
            return res.status(201).json({ "msg": "정상적으로 메시지를 보냈습니다." });
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};


export const readMessage = async (req, res) => {

    try {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        else {


        }
    } catch (error) {
        console.log(err);
        throw new Error(err);        
    }
};


// ===================================================================================== //


// // dump data 만들기
// export const makeDumpDeposit = async (req, res) => {
//     try {
//         await makeDepositDumpData();
//         return res.status(201).json({msg: "Deposit dump data 생성 성공"});
//     } catch (error) {
//         return res.status(400).json({msg: "Deposit dump data 생성 실패"});
//     }
// };

// // dump data 겸 모든 Deposit 지우기
// export const deletAllDeposit = async (req, res) => {
//     try {
//         const result = await deleteDepositAll();
//         return res.status(201).json({msg: `Deposit delete all ${result}개 삭제 성공`});
//     } catch (error) {
//         return res.status(400).json({msg: "Deposit delete all 실패"});   
//     }
// };