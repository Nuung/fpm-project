'use strict';

import {
    makeToken, makeRefreshToken,
    findUserById, findUserByPwd, createUser
} from '../service/userService.js';

/**
 * @description 사용자 회원가입
 * @param {User Model Json} req 
 * @param {리턴 data 참조} res 
 * @returns 
 */
export const signUp = async (req, res) => {
    const { body: { userId } } = req;

    try {
        const user = await findUserById(userId);
        if (user) {
            const error = '이미 가입 된 사용자 입니다.';
            return res.status(401).json({ error });
        }
        else {
            const newUser = createUser(req.body);

            // sign up 과 동시에 토큰 발급 
            const token = makeToken(userId);
            const refToken = makeRefreshToken(userId);
            const data = {
                msg: `${newUser.userId}님 회원가입에 성공했습니다`,
                token,
                refToken
            };
            return res.status(201).json({ data });
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};


export const signIn = async (req, res) => {

    try {
        const { body: { userId, password } } = req;

        // request first, Find user by id 
        const userIdChk = await findUserById(userId);
        if (!userIdChk) {
            const error = '존재하지 않는 아이디 입니다.';
            return res.status(401).json({ error });
        }

        // user를 얻어오면 그를 바탕으로 pwd 검증
        const userPwdChk = await findUserByPwd(userIdChk, password);
        if (!userPwdChk) {
            const error = '비밀번호 또는 아이디가 일치하지 않습니다.';
            return res.status(401).json({ error });
        }

        // ID, PASS 모두 성공
        if (userPwdChk && userIdChk) {
            //login 성공 메시지 
            const token = makeToken(userId);
            const refToken = makeRefreshToken(userId);
            const data = {
                message: `${userIdChk.userId}님 로그인에 성공했습니다.`,
                token,
                refToken
            };

            // token 쿠키 세팅
            const options = {
                maxAge: 1000 * 60 * 15, // expires in 15 minutes
                httpOnly: true,         // client can't get cookie by script
                secure: false,          // only transfer over https
                sameSite: true,         // only sent for requests to the same FQDN as the domain in the cookie
            };
            res.cookie('amnoti_jwt_token', token, options);
            return res.status(201).json({ data });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// access token을 refresh token 기반으로 재발급
export const genRefreshToken = (req, res) => {
    const refToken = req.body.refToken;
    if (!refToken) {
        const error = '만료된 인증입니다.';
        return res.status(401).json({ error });
    }

    // sign up 과 동시에 토큰 발급 
    const token = makeToken(refToken);
    const data = {
        msg: `새 인증 토큰 발급 성공했습니다`,
        token
    };

    // token 쿠키 세팅
    const options = {
        maxAge: 1000 * 60 * 15, // expires in 15 minutes
        httpOnly: true,         // client can't get cookie by script
        secure: false,          // only transfer over https
        sameSite: true,         // only sent for requests to the same FQDN as the domain in the cookie
    };
    res.cookie('amnoti_jwt_token', token, options);

    return res.status(201).json({ data });
};

// Auth 값 기반으로 자신의 User 정보 얻어오기
export const getUser = async (req, res) => {
    const userId = req.params.id;
    if (req.user.id === userId) {
        const user = await findUserById(userId);

        // return user model data 조절하기
        // console.dir(user._doc);
        delete user._doc._id;
        delete user._doc.password;
        const data = {
            user,
            "jwt": req.user,
        }
        return res.status(200).json({ data });
    }
    else {
        const error = '올바르지 않은 접근 입니다.';
        return res.status(401).json({ error });
    }
};