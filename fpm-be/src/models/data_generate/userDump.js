
import User from "../user.js";


const generateRrandomEmail = (howMany) => {
    const chr = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const email_list = new Array()
    for (let i = 0; i < howMany; i++){
        let temp = '';
        for(let j = 0; j < 15; j++){
            temp += chr[Math.floor(Math.random() * chr.length)];
        }
        temp += '@gmail.com';
        email_list.push(temp)
    }
    return email_list;
}


export const makeUserDumpData = async () => {
    const email_list = generateRrandomEmail(10);
    try {
        for (let i = 0; i < email_list.length; i++) {
            const email = email_list[i];
            const newUser = new User({
                userId: email,
                password: "123",
                nickName: `${email}닉네임`,
                hashtag: []
            });
            await newUser.save();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};