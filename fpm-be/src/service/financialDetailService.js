import User from "../models/user.js";
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
};


// array 중에서 value의 랭크는 몇등?
const getRank = (value, arr) => {
	const sorted = arr.slice().sort(function(a,b){return b-a});
	const rank = sorted.indexOf(value);
	if(rank > -1) return rank + 1;
	return null;
}



// find user's financial rank
export const findFinancialRankByUser = async (requestUser, targetHashtag) => {
    try {
        // 요청한 유저의 totalAsset
        let userTotalAsset = 0;

        // 사전에 user hashtag와 finanicalDetail이 모두 세팅이 되어 있어야함
        // targetHashtag는 array 
        const targetUsers = await User.find({hashtag: {$in: targetHashtag}})
        const tempArr = new Array()

        // 각 유저의 totalAssest을 구해서 유저의 totalAssets 값에 따라 상위 계산
        const totalAssetList = ["depositTotalAmt", "insureAmt", "irpAmt", "stockAmt"]
        for (let i = 0; i < targetUsers.length; i++) {
            const user = targetUsers[i];
            const userFinancialDetail = await FinancialDetail.findOne({ userId: user.userId }).exec()
            
            // 유저의 전 자산 총액 구하기
            let totalAsset = 0;
            for (const [key, value] of Object.entries(userFinancialDetail._doc)) {
                if (totalAssetList.includes(key)) totalAsset += value
            }
            tempArr.push(totalAsset);
            
            // 요청한 유저의 totalAsset이면 기억하기
            if (requestUser.userId === user.userId) userTotalAsset = totalAsset;
        }

        // 유저의 rank와 상위 % 계산해서 return
        const rank = getRank(userTotalAsset, tempArr)
        const percent = (rank / targetUsers.length) * 100;
        return { rank, percent }

    } catch (err) {
        console.error(err);
        return err;
    }
};

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