
import Deposit from '../models/deposit.js';

// Deposit delete all
export const deleteDepositAll = async () => {
    try {
        const {acknowledged, deletedCount} = await Deposit.deleteMany({});
        return deletedCount;
    } catch (err) {
        console.error(err);
        return err;
    }
};