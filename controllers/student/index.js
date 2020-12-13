const Student = require('../../models/Students');
const encryptPassword = require('../../helper/encryptPassword');
const authStudent = require('../../helper/AtuthStudentToken');
const generateCode = require('../../helper/generateVerifyCode');
const comparePassword  = require('../../helper/comparePassword');
const { compare } = require('bcryptjs');

module.exports = () => {

    const resgisterStudentController = async (req,res) => {

        const {firstName,lastName,email,username,password,age,genderID,teamID,active,universityCode} = req.body;
        try {
            const checkUserName = await Student.GetStudentByUserName(username);
            if(checkUserName){
                return res.status(400).json({msg:"Username already exists"});
            }
            const hashPassword = await encryptPassword(password);
            let student = new Student(null,firstName,lastName,email,username,hashPassword,age,teamID,genderID,universityCode,active);

         const result = await  student.registerStudent(student);
         const token =  authStudent(result);
         const code =  await  generateCode(result.email)
         res.status(201).json({...result,token,code});

        } catch (error) {
         res.status(500).send({msg:'Internal server error' + error});   
        }
        
        
        
    }

    const loginStudent = async (req,res) => {
        
       const {user,password} = req.body;
       try {
        let student;
        const emailCheck = user.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        console.log(emailCheck);
        if(emailCheck){
             student = await  Student.GetStudentByEmail(user); 
            
            

        }else{
            student = await Student.GetStudentByUserName(user);
            
        }
        if(!student){
          return res.status(400).json({msg:"email or username is not exist"})
        }

        const match = await comparePassword(password,student.password);
        if(!match){
            return res.status(400).json({msg:"password is not valid"});
        } 
        const token = authStudent(student);
        let code;
        if(!student.active){
                code = await generateCode(student.email);
        }
        res.status(201).json({...student,token,code});
   
       } catch (error) {
            res.status(500).json({msg:"inernal server error"});           
       }
      
    }

    const getAllStudentController = async (req,res) => {
        try {
            const students = await Student.getAllStudents();
            res.status(200).json(students);     
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
       
    }
    const getAStudentController = async (req,res) => {
        const id = req.params.id;
        try {
            const student = await Student.getAStudentByID(id);
            res.status(200).json(student);

        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    return{
        resgisterStudentController,
        loginStudent,
        getAllStudentController,
        getAStudentController
       
    }
}