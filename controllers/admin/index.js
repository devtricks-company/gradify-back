const Admin = require('../../models/Admin');
const encryptPassword = require('../../helper/encryptPassword');
const comparePassword = require('../../helper/comparePassword');
const AuthAdminToken = require('../../helper/AuthAdminToken');
module.exports = () => {

    const addAdminController =async (req,res) => {
        
        const {name,email,password,role} = req.body;
        
        try {
            let admin = await Admin.getAdminByEmail(email);
            if(admin){
                return res.status(400).json({msg:"email is already exist"});
            }
            const hashPassword = await encryptPassword(password);
            console.log(hashPassword);
            admin = new Admin(null,name,email,hashPassword,role);
            
            const adminRegisterd = await admin.addAdmin(admin);
            
            res.status(200).json(adminRegisterd);


        } catch (error) {
            res.status(500).json({msg:'internal server error' + error});
        }
    }

    const loginAdmin = async (req,res) => {
        const {email,password} = req.body;

        const admin = await Admin.getAdminByEmail(email);
        if(!admin){
            return res.status(400).json({msg:"email is not exist"});
        }
        const match = await comparePassword(password,admin.password);
        if(!match){
            return res.status(400).json({msg:"password is not valid"});
        }

        const token  = AuthAdminToken(admin);

        res.status(201).json({token});

    }

    

    return{
        addAdminController,
        loginAdmin
    }
}