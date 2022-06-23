
import Loan from '../models/loan.js';

// find all by user id 
export const findLoanAllByUserId = async (userId) => {
    try {
        const userLoans = await Loan.find({ userId: userId }).exec()
        return userLoans;
    } catch (err) {
        console.error(err);
        return err;
    }
}

// Loan delete all
export const deleteLoanAll = async () => {
    try {
        const {acknowledged, deletedCount} = await Loan.deleteMany({});
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};