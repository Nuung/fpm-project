
import FinancialDetail from "../models/financialDetail.js";

// find all by user id 
export const findFinancialDetailByUserId = async (userId) => {
    try {
        const userFinancialDetail = await FinancialDetail.find({ userId: userId }).exec()
        return userFinancialDetail;
    } catch (err) {
        console.error(err);
        return err;
    }
}

// Loan delete all
export const deleteFinancialDetailAll = async () => {
    try {
        const {acknowledged, deletedCount} = await FinancialDetail.deleteMany({});
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};