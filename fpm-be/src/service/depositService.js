
import Deposit from '../models/deposit.js';


// find all by user id 
export const findDepositAllByUserId = async (userId) => {
    try {
        const userDeposits = await Deposit.find({ userId: userId }).exec()
        return userDeposits;
    } catch (err) {
        console.error(err);
        return err;
    }
}



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

// get total amount
export const getTotalDepoAmt = async (userId) => {
    try {
        const depositList = await Deposit.find({"userId":userId});
        let amount = 0;
        depositList.forEach(element => {
            amount += element.balanceAmt;
        });
        return amount;
    } catch (err) {
        console.error(err);
        return err;
    }
};