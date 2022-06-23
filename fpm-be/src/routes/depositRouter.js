'use strict';

// ==================== middlewares ==================== //

import { makeDumpDeposit, deletAllDeposit } from '../controllers/depositController.js';

// ==================== Routing ==================== //

const depositRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpDeposit);
    app.route(`${endpoint}/dump`).delete(deletAllDeposit);

};

export default depositRouter;