
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// create default token
export const makeToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 365 * 24 * 60 * 60,
        issuer: 'amnotify'
    });
};

// create refresh token
export const makeRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "180 days",
        issuer: 'amnotify'
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
    const { userId, password, nickName, group } = body;
    try {
        const newUser = new User({
            userId: userId,
            password: password,
            nickName: nickName,
            group: group
        });

        const saveUser = await newUser.save();
        return saveUser;
    } catch (err) {
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