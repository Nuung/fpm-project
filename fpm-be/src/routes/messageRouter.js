'use strict';

// ==================== middlewares ==================== //

import { sendMessage, readMessage, listOfMessage, deletAllMessage } from '../controllers/messageController.js';
import { authCheck } from '../middlewares/auth.js';

// ==================== Routing ==================== //

const messageRouter = (app, endpoint) => {

    // dump data 만들기, all 삭제하기
    // app.route(`${endpoint}/dump`).post(makeDumpDeposit);
    app.route(`${endpoint}/dump`).delete(deletAllMessage);

    // message 전송
    app.use(`${endpoint}`, authCheck);
    app.route(`${endpoint}/`).post(sendMessage);
    
    app.use(`${endpoint}s`, authCheck);
    app.route(`${endpoint}s`).get(listOfMessage);
    app.route(`${endpoint}s/:fromUserId`).get(readMessage);

};

export default messageRouter;