'use strict';

// ==================== middlewares ==================== //

import { getAllStocks, makeDumpStock, deleteAllStock } from '../controllers/stockController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const stockRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    app.route(`${endpoint}/dump`).post(makeDumpStock);
    app.route(`${endpoint}/dump`).delete(deleteAllStock);

    // get all stock about user
    app.use(`${endpoint}s`, authCheck);
    app.route(`${endpoint}s`).get(getAllStocks);
};

export default stockRouter;