
import User from '../models/user.js';
import Deposit from '../models/deposit.js';
import jwt from 'jsonwebtoken';

// create default token
export const makeToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 365 * 24 * 60 * 60,
        issuer: 'fpm'
    });
};

// create refresh token
export const makeRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "180 days",
        issuer: 'fpm'
    });
};

// user id check 
export const findUserById = async (id) => {
    try {
        const user = await User.findOne({ userId: id }).exec()
        return user;
    } catch (err) {
        console.error(err);
        return err;
    }
};

// user pass check 
export const findUserByPwd = async (user, pwd) => {
    try {
        return await user.checkPassword(pwd);
    } catch (err) {
        console.error(err);
        return err;
    }
};


// user create 
export const createUser = async (body) => {
    const { userId, password, nickName } = body;
    try {
        const newUser = new User({
            userId: userId,
            password: password,
            nickName: nickName,
            hashtag: [],
        });

        const saveUser = await newUser.save();
        return saveUser;
    } catch (err) {
        console.error(err);
        return err;
    }
};


// user hash update -> 최초로 user의 hash태그가 만들어 질 때!
export const updateUserHashTag = async (user) => {
    try {
        
        // step1. 해당 유저의 deposit (바뀔 가능성 있음, 거래 내역 등으로) 가져온다.
        const userDeposit = await Deposit.findOne({ userId: user.userId }).exec();

        // step2. 해당 유저의 deposit의 res_list를 분석한다. (분류 한다.)
        const hashTagList = new Array();
        const temp = new Array(); // 일단 여기에 분류를 다 때려박은 array 만들고
        for (let i = 0; i < userDeposit.res_list.length; i++) {
            const element = userDeposit.res_list[i];
            temp.push(element.printed_content);
        }

        // 다 때려박은 array로 부터 Map 형태로
        const result = temp.reduce((accu,curr)=> {
            accu.set(curr, (accu.get(curr)||0) + 1) ;
            return accu;
        },new Map());
        
        // 그 map을 내림차순으로 다시 정렬
        const sortedResult = new Map([...result].sort((a, b) => b[1] - a[1]));

        // 그럼 상단 4개만 hashTagList에 추가한다!
        hashTagList.push(sortedResult.keys().slice(3));
        hashTagList.push(user.gender);
        hashTagList.push(user.age);
        
        // step3. 분류된 hashtag array 값으로 user를 update 한다. 그리고 그 updated 된 user 를 return
        const updatedUser = await findOneAndUpdate({ userId: user.userId }, { hashtag: hashTagList });
        return updatedUser;
    } catch (error) {
        console.error(err);
        return err;
    }
};


// user delete
export const deleteUser = async (body) => {
    const { userId } = body;
    try {
        const {acknowledged, deletedCount} = await User.deleteOne({ userId: userId });
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};

// user delete all
export const deleteUserAll = async () => {
    try {
        const {acknowledged, deletedCount} = await User.deleteMany({});
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};