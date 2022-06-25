'use strict';

// ==================== middlewares ==================== //

import { getFinancialDetail, getFinancialDetailById, getUserFinancialRank, 
    getUserFinancialRankById,makeDumpFinancialDetail, deletAllFinancialDetail } from '../controllers/financialDetailController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const financialDetailRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpFinancialDetail);
    app.route(`${endpoint}/dump`).delete(deletAllFinancialDetail);

    // get all financialDetail about user
    app.use(`${endpoint}`, authCheck);
    app.route(`${endpoint}`).get(getFinancialDetail);
    app.route(`${endpoint}/:userId`).get(getFinancialDetailById);
    
    // get rank
    app.route(`${endpoint}/user/rank`).get(getUserFinancialRank);
    app.route(`${endpoint}/user/rank/:userId`).get(getUserFinancialRankById);
};

export default financialDetailRouter;