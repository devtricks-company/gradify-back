const sql = require('mssql');

class Admin{
    constructor(id=null,name,email,password,role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    async addAdmin(admin){
        const {name,email,password,role} = admin;
       try {
        const request  = await new sql.Request();
        const result = await request.input('Name',sql.NVarChar,name)
        .input('Email',sql.NVarChar,email)
        .input("Password",sql.NVarChar,password)
        .input('Role',sql.NVarChar,role)
        .execute('dbo.spAddAdmin');
        console.log(result);
        return new Admin(result.returnValue,name,email,password,role); 
       } catch (error) {
           throw new Error('internal server error');
       }
        
        
    }

    static async getAdminByEmail(email){
        try {
            const request = await new sql.Request();
            const result = await request.input('Email',sql.NVarChar,email)
            .execute('dbo.spGetAdminByEmail');
            
            return result.recordset[0]
        } catch (error) {
            throw new Error('internal server error' + error);
        }
    }
}

module.exports = Admin