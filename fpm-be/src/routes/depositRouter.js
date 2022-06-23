'use strict';

// ==================== middlewares ==================== //

import { makeDumpDeposit, deletAllDeposit,getTotalAmt } from '../controllers/depositController.js';

// ==================== Routing ==================== //

const depositRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpDeposit);
    app.route(`${endpoint}/dump`).delete(deletAllDeposit);

    // total amt 구하기
    app.route(`${endpoint}/amt`).get(getTotalAmt);
};

export default depositRouter;