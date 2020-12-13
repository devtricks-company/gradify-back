const bcryptJs = require('bcryptjs');

module.exports = async (password) => {
    const salt = await bcryptJs.genSalt(10);
    const hashPassword = await bcryptJs.hash(password,salt);
    return hashPassword;
}
