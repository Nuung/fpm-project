import mongoose from 'mongoose';

// 몽구스 스키마 - 필드 정의
const profileSchema = mongoose.Schema({ 
    userId: {
        type: String,
        required: true
    },
    follwer: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// collection 이름 정하기
profileSchema.set('collection', 'profile'); 

// 모델만들고 내보내기
const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
