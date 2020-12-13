const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req,res,next) => {
    const token = req.header('x-auth-admin-token');
    if(token){
        try {
            
            const decode = jwt.verify(token,config.get("SECRETKEYADMIN"));
            req.admin = decode;
            return next();   
            
        } catch (error) {
            res.status(401).json({msg:"token is not valid"});
        }
        
    }else{
        res.status(401).json({msg:"token is not exist"});
    }
}