const student = require("../controllers/student");
const sql = require('mssql');

class Student{
    constructor(id=null,firstName,lastName,email,username,password,age,teamID,genderID,universityCode,active){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.age = age;
        this.teamID = teamID;
        this.genderID = genderID;
        this.universityCode = universityCode;
        this.active = active;
    }

     async registerStudent(student) {
           console.log(student.firstName)
        try {
            const request = await new sql.Request();
            const result = await request.input('Email',sql.NVarChar,student.email)
            .input('username',sql.NVarChar,student.username)
            .input('password',sql.NVarChar,student.password)
            .input('firstName',sql.NVarChar,student.firstName)
            .input('lastName',sql.NVarChar,student.lastName)
            .input('age',sql.Int,student.age)
            .input('genderID',sql.Int,student.genderID)
            .input('universityCode',sql.Int,student.universityCode)
            .input('teamID',sql.Int,student.teamID)
            .input('active',sql.Bit,student.active)
            .execute('dbo.spRegisterStudent');
            if(result.returnValue == 0){
           
                throw new Error('Student Email already exist');
                
            }
            if(result.returnValue > 0){
               
                return new Student(result.returnValue,this.firstName,this.lastName,this.email,this.username,this.password,this.age,this.genderID,this.teamID,this.universityCode,this.active);
               
            }
             
        } catch (error) {
           throw new Error('Internal server Error model' + error) 
        }
           
           
    }

    static async GetStudentByEmail(email){
        
            const request = await new sql.Request();
            const result = await request.input('Email',sql.NVarChar,email)
            .execute('dbo.spGetStudentByEmail');
            return result.recordset[0];
        
    }

    static async GetStudentByUserName(username){
     
            const request = await new sql.Request();
            const result = await request.input('username',sql.NVarChar,username)
            .execute('dbo.spGetStudentByUsername');
            return result.recordset[0];
     
    }

    static async getAllStudents(){
        const request = await new sql.Request();
        const result = await request.execute('dbo.spGetAllStudents');
        return result.recordset;
    }

    static async getAStudentByID(id){
        const request = await new sql.Request();
        const result = await request.input('StudentID',sql.Int,id)
        .execute('dbo.getAStudent');
        return result.recordset[0];
    }
}

module.exports = Student;