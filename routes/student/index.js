const express = require('express');

const route = express.Router();
const studentController = require('../../controllers/student');
const ValidationReq = require('../../helper/ValidationReq');
const Student = require('../../models/Students');
const studentCTL = studentController();

//method:post
//desc:resgister student
//access:public

route.post('/',ValidationReq.checkRegisterStudent(),ValidationReq.validate,studentCTL.resgisterStudentController);

//method:post
//desc:resgister student
//access:public
route.post('/login',ValidationReq.checkLogin(),ValidationReq.validate,studentCTL.loginStudent)
route.get('/',studentCTL.getAllStudentController);
route.get('/:id',studentCTL.getAStudentController);

module.exports = route;