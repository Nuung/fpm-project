'use strict';

import {
    createMessage, getAllMessageAndRead, getAllUnReadMessage, deleteMessageAll
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
        const fromUser = await findUserById(req.user.id);
        const toUser = await findUserById(req.body.toUserId);
        if (!fromUser || !toUser) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        else if (req.user.id === req.body.toUserId) {
            const error = '자기 자신에게 메시지를 보낼 수 없습니다.';
            return res.status(400).json({ error });
        }
        else {
            await createMessage(req.body, fromUser);
            return res.status(201).json({ "msg": "정상적으로 메시지를 보냈습니다." });
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

/**
 * 나에게 보낸 메시지를 읽음 -> 채팅방 내부에 계속해서 일어날 액션임
 * @param {*} req uri에 fromUserId, 즉 jwt토큰의 유저가 어떤 사람이 보낸 msg를 읽을지
 * @param {*} res 
 * @returns 
 */
export const readMessage = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        const fromUser = await findUserById(req.params.fromUserId);
        if (!user || !fromUser) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }
        else {
            const allMessage = await getAllMessageAndRead(req.user.id, req.params.fromUserId);
            delete user._doc._id;
            delete user._doc.password;
            delete fromUser._doc._id;
            delete fromUser._doc.password;
            delete fromUser._doc.gender;
            delete fromUser._doc.age;
            delete fromUser._doc.createdAt;
            return res.status(200).json({ user, fromUser, allMessage });
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};


/**
 * 나에게 메시지를 보낸 채팅방 리스트를 보여줌
 * @param {*} req 
 * @param {*} res 
 */
export const listOfMessage = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        if (!user) {
            const error = '올바르지 않은 접근 입니다.';
            return res.status(401).json({ error });            
        }

        const allMessage = await getAllUnReadMessage(req.user.id);
        delete user._doc._id;
        delete user._doc.password;
        return res.status(200).json({ user, allMessage });  
    } catch (err) {
        
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

// dump data 겸 모든 Message 지우기
export const deletAllMessage = async (req, res) => {
    try {
        const result = await deleteMessageAll();
        return res.status(201).json({msg: `Message delete all ${result}개 삭제 성공`});
    } catch (error) {
        return res.status(400).json({msg: "Message delete all 실패"});   
    }
};