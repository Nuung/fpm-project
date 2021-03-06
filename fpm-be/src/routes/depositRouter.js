'use strict';

// ==================== middlewares ==================== //

import { getAllDeposits, getTotalAmt,makeDumpDeposit, deletAllDeposit } from '../controllers/depositController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const depositRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpDeposit);
    app.route(`${endpoint}/dump`).delete(deletAllDeposit);

    // total amt 구하기
    app.route(`${endpoint}/amt`).get(getTotalAmt);
    
    // get all deposit about user
    app.use(`${endpoint}s`, authCheck);
    app.route(`${endpoint}s`).get(getAllDeposits);
};

export default depositRouter;