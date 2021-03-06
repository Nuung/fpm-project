'use strict';

// ==================== middlewares ==================== //

import { validateUserCreate } from '../middlewares/validators/userValidator.js';
import { authCheck } from '../middlewares/auth.js';
import { signUp, signIn, genRefreshToken, 
    getUser, getUserHashtag, makeDumpUser, 
    deletAllUser, makeDumpUserHashTag, getUserRecommand } from '../controllers/userController.js';

// ==================== Routing ==================== //
// https://velog.io/@ikswary/JWT%EC%9D%98-%EB%B3%B4%EC%95%88%EC%A0%81-%EA%B3%A0%EB%A0%A4%EC%82%AC%ED%95%AD
const userRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpUser);
    app.route(`${endpoint}/dump`).delete(deletAllUser);
    app.route(`${endpoint}/hashtag/dump`).post(makeDumpUserHashTag)




    // 회원가입 벨리데이션
    // app.use(`${endpoint}`, validateUserCreate);
    app.route(`${endpoint}`).post(signUp);
    app.route(`${endpoint}/login`).post(signIn);

    // access token을 refresh token 기반으로 재발급
    app.route(`${endpoint}/refresh`).post(genRefreshToken);

    // 자기 정보 얻어오기
    app.use(`${endpoint}/:id`, authCheck);
    app.route(`${endpoint}/:id`).get(getUser);

    // user의 hash tag 가져오기
    app.route(`${endpoint}/:id/hashtag`).get(getUserHashtag);

    // user의 추천 사용자 가져오기
    app.route(`${endpoint}/hashtag/recommand`).get(getUserRecommand);
};

export default userRouter;