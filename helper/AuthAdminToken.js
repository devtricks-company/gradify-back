const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (admin) => {
    const token = jwt.sign({...admin},config.get('SECRETKEYADMIN'),{
        expiresIn:'1h'
    })
    return token;
}