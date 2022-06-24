
import Stock from '../models/stock.js';


// find all by user id 
export const findStockAllByUserId = async (userId) => {
    try {
        const userStocks = await Stock.find({ userId: userId }).exec()
        return userStocks;
    } catch (err) {
        console.error(err);
        return err;
    }
}



// stock delete all
export const deleteStockAll = async () => {
    try {
        const {acknowledged, deletedCount} = await Stock.deleteMany({});
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};
