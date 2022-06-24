'use strict';

// ==================== middlewares ==================== //

import { getFinancialDetail, makeDumpFinancialDetail, deletAllFinancialDetail } from '../controllers/financialDetailController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const financialDetailRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpFinancialDetail);
    app.route(`${endpoint}/dump`).delete(deletAllFinancialDetail);

    // get all financialDetail about user
    app.use(`${endpoint}`, authCheck);
    app.route(`${endpoint}`).get(getFinancialDetail);
};

export default financialDetailRouter;