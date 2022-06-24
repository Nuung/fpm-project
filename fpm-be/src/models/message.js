import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const messageSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    fromUserId: {
        type: String,
        required: true
    },
    fromUserNickName: String,
    msg: String,
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
messageSchema.set('collection', 'message'); 

// 모델만들고 내보내기
const Message = mongoose.model("Message", messageSchema);
export default Message;
