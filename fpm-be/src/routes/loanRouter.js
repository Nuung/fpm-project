'use strict';

// ==================== middlewares ==================== //

import { getAllLoans, makeDumpLoan, deletAllLoan } from '../controllers/loanController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const loanRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpLoan);
    app.route(`${endpoint}/dump`).delete(deletAllLoan);

    // get all Loan about user
    app.use(`${endpoint}s`, authCheck);
    app.route(`${endpoint}s`).get(getAllLoans);
};

export default loanRouter;