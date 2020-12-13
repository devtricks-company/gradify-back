const sendingEmailToVerify = require('./sendigVerifyEmail');
module.exports = async (email) => {
    const code = Math.floor(Math.random() * 99999) + 10000;
    await sendingEmailToVerify(email,code);
    return code;
}