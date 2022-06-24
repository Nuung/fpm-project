
import Message from '../models/message';

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


// read action -> update msg and get all
export const updateManyMessage = async (userId) => {
    try {
        
    } catch (error) {
        
    }
};


export const getAllMessage = async (userId) => {
    try {
        
    } catch (error) {
        
    }
};