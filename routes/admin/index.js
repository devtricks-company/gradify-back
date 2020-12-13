const express = require('express');
const route = express.Router();
const adminController = require('../../controllers/admin');
const adminValidation = require('../../helper/ValidationReq');
const authAdminMiddelware = require('../../middleware/authAdminMiddelware');
const adminCTL = adminController();

console.log(adminCTL)

route.post('/',adminValidation.checkRegisterAdmin(),adminValidation.validate,authAdminMiddelware,adminCTL.addAdminController);

route.post('/login',adminValidation.checkAdminLogin(),adminValidation.validate,adminCTL.loginAdmin)




module.exports = route;