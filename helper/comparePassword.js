const bcryptJs = require('bcryptjs');

module.exports = async (password,hashPassword) => {
    const match = await bcryptJs.compare(password,hashPassword);
    return match;
}
