const jwt = require('jsonwebtoken');
const student = require('../controllers/student');
const config = require('config');

module.exports = (student) => {
   const token =  jwt.sign({...student},config.get('SECRETKEY'),{
        expiresIn:"1h"
    })

    return token;
}

