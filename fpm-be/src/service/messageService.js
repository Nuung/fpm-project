
import Message from '../models/message.js';

// message create 
export const createMessage = async (body, userId) => {
    const { fromUserId, msg } = body;
    try {
        const newMessage = new Message({
            userId: userId,
            fromUserId: fromUserId,
            msg: msg,
        });
        const saveMessage = await newMessage.save();
        return saveMessage;
    } catch (err) {
        console.error(err);
        return err;
    }
};


// read action -> get all and update msg to read and return all
export const getAllMessageAndRead = async (userId, fromUserId) => {
    try {
        const userMessage = await Message.find({ 
            userId: userId,
            fromUserId: fromUserId,
        })
        .sort({ 'createdAt': 1 })
        .exec();

        const returnMessage = new Array();
        for (let i = 0; i < userMessage.length; i++) {
            const msg = userMessage[i];
            if (!msg.isRead) {
                msg.isRead = true;
                msg.save();
            }
            returnMessage.push(msg);
        }
        return returnMessage;
    } catch (err) {
        console.error(err);
        return err;
    }
};


// get all unread from userId
export const getAllUnReadMessage = async (userId) => {

    try {

        // // userId의 안읽은 msg모두 가져온다. 
        // 그리고 fromUserId 값 기반으로 grouping 해준다.
        const userMessage = await Message.aggregate(
            [
                { "$match": { userId, isRead: false } },
                { "$sort": { "createdAt": 1 } },
                { "$group": { 
                    "_id": "$fromUserId",
                    "userId": { "$last": "$userId" },
                    "msg": { "$last": "$msg" },
                    "createdAt": { "$last": "$createdAt" },
                    "counts": {
                        $sum: 1
                    }
                }}        
            ],
        ).exec();
        return userMessage;
    } catch (err) {
        console.error(err);
        return err;
    }
};
